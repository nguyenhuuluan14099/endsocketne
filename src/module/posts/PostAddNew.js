import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { postStatus } from "utils/constants";
import ImageUpload from "components/images/ImageUpload";
import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { useAuth } from "contexts/Auth-context";
import { toast } from "react-toastify";

const PostAddNew = () => {
  const { userInfo } = useAuth();

  const { control, watch, handleSubmit, setValue, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 2,
      category: {},
      title: "",
      slug: "",
      hot: false,
      image: "",
      user: {},
    },
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    image,
    progress,
    handleResetImage,
    handleDeleteImage,
    handleUploadImage,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);
  useEffect(() => {
    async function fetchUserData() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email]);
  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      handleUploadImage(cloneValues.image);

      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        categoryId: cloneValues.category.id,
        userId: cloneValues.user.id,
        image,
        createdAt: serverTimestamp(),
      });
      toast.success("create new post successfully");
      reset({
        status: 2,
        category: {},
        title: "",
        slug: "",
        hot: false,
        image: "",
        user: {},
      });
      handleResetImage();
      setSelectCategory({});
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);
  const handleSelectOption = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);

    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  useEffect(() => {
    document.title = "Monkey Blogging- Add New post";
  });
  return (
    <>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-2 form-layout">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2 form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              onChange={handleSelectImage}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectCategory?.name || "Select the category"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {/* {selectCategory?.name && (
              <span className="inline-block p-3 text-green-500 rounded-lg bg-green-50">
                {selectCategory.name}
              </span>
            )} */}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2 form-layout">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>

          <Field>
            <Label>Author</Label>
            <Input
              control={control}
              placeholder="Enter your author"
              name="author"
            ></Input>
          </Field>
        </div>
        <Field>
          <Label>Status</Label>
          <FieldCheckboxes>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.APPROVED}
              value={postStatus.APPROVED}
            >
              Approved
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.PENDING}
              value={postStatus.PENDING}
            >
              Pending
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={Number(watchStatus) === postStatus.REJECTED}
              value={postStatus.REJECTED}
            >
              Reject
            </Radio>
          </FieldCheckboxes>
        </Field>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={loading}
          disabled={loading}
        >
          Add new post
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;
