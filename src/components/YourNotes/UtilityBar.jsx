import React, { useState, useContext } from "react";
import Button from "../UI/Button";
import { NoteContext } from "../../context/NoteContext";

function UtilityBar({ id, trackData }) {
  const { handleTrackDelete } = useContext(NoteContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCancel = () => {
    setShowDeleteModal(false);
  };
  const docuRef = trackData.docRef;

  const callTrackDelete = () => {
    handleTrackDelete(docuRef);
    setShowDeleteModal(false);
  };
  const toggleModal = () => {
    setShowDeleteModal(true);
  };
  return (
    <>
      {showDeleteModal && (
        <div className="left-0 top-0 z-10 bg-gray-500 bg-opacity-20 w-screen flex flex-col overflow-hidden fixed h-screen">
          <div className="flex flex-col justify-center m-auto bg-white p-4 rounded-md bottom-52 relative">
            <p className="p-2">Are you sure you wish to delete this track?</p>
            <p className="p-2 text-sm">{trackData.title}</p>
            <div className="flex justify-end p-2 mt-2">
              <Button onClick={callTrackDelete} type="outline">
                Delete
              </Button>
              <Button onClick={handleCancel} type="outline">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex">
        <div>
          <Button type="outline">Comment</Button>
          <Button type="outline">Share</Button>
          <Button type="outline">Edit</Button>
        </div>
        <div>
          <Button onClick={toggleModal} type="outline">
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}

export default UtilityBar;
