import React, { useEffect, useState } from "react";
import { db, storageRef } from "../../firebase";
import { Image, Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import "./DisplayImages.css";

const DisplayImages = () => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    db.collection("images").onSnapshot(querySnapshot => {
      const files = [];
      querySnapshot.forEach(doc => {
        files.push({ ...doc.data(), id: doc.id });
      });
      setImageList(files);
    });
  });

  const handleImageDelete = async image => {
    try {
      const imageRef = storageRef.child(image.path);
      await imageRef.delete();
      await db.collection("images").doc(image.id).delete();
      message.success("Image deleted successfully");
    } catch (err) {
      message.error("Error deleting image");
    }
  };

  return (
    <div className="image-display-container">
      <div className="header">Uploaded Images</div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry gutter="10px">
          {imageList.map(image => (
            <div className="masonry-item" key={image.id}>
              <Image src={image.url} key={image.id} />
              <Popconfirm
                placement="topRight"
                title="Are you sure you want to delete this image?"
                onConfirm={() => handleImageDelete(image)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  title="Delete"
                  size="small"
                  className="delete-btn"
                  style={{
                    background: "white",
                    color: "#f33d3d",
                    border: "none",
                  }}
                >
                  <DeleteOutlined className="table-button-icon" size={30} />
                </Button>
              </Popconfirm>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default DisplayImages;
