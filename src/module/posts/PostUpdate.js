import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/images/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import Toggle from "components/toggle/Toggle";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { postStatus } from "utils/constants";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { toast } from "react-toastify";
import axios from "axios";
import { imgbbAPI } from "config/apibbImg";
Quill.register("modules/imageUploader", ImageUploader);
const PostUpdate = () => {
  const [param] = useSearchParams();
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const postId = param.get("id");

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const imageUrlName = getValues("image");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrlName);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, progress, setImage, handleDeleteImage, handleSelectImage } =
    useFirebaseImage(setValue, getValues, imageName, DeleteImage);
  async function DeleteImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }
  useEffect(() => {
    setImage(imageUrlName);
  }, [setImage, imageUrlName]);
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "posts", postId);
      const docData = await getDoc(colRef);
      // console.log(docData.data());
      if (docData.data()) {
        reset(docData.data());
        setSelectCategory(docData.data()?.category || "");
        setContent(docData.data()?.content);
      }
    }
    fetchData();
  }, [postId, reset]);
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
  const updateHandlePost = async (values) => {
    console.log(values);
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      ...values,
      image,
      content,
    });
    toast.success("update post successfully");
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        // imgbbAPI
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  if (!postId) return null;
  return (
    <>
      <DashboardHeading
        title="Post update"
        desc="update post current"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateHandlePost)}>
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
            {selectCategory?.name && (
              <span className="inline-block p-3 text-green-500 rounded-lg bg-green-50">
                {selectCategory.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">
          <div></div>
          <Label>Content</Label>
          <div className="entry-content">
            {
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            }
          </div>
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
        </div>

        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
