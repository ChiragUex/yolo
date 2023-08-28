import React from "react";

const SaveAsDraft = ({onSaveAsDraft, section}) => {
  return (
    <div className="d-flex justify-between align-items-center">
      <div className="customer-information-heading">
        {section}
      </div>
      <button
      onClick={() => onSaveAsDraft()}
        className="button-primary next-button full-rounded w-136 h-42">
        Save as Draft
      </button>
    </div>
  );
}

export default SaveAsDraft;
