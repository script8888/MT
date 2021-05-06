import React, { useState } from "react";
import "./SettingsContent.css";

const SettingsApiCall = ({
  carrierData,
  data,
  baseRate,
  additionalKm,
  flatRate,
  riderCommission,
  maximumDistance,
}) => {
  const [isEdit, setIsEdit] = useState(true);
  const toggleClick = () => setIsEdit(prevEdit => !prevEdit);

  const [carrierValue, setCarrierValue] = useState(() => {
    return carrierData.find(cd => cd.value === data.carrier);
  });
  const [weightValue, setWeightValue] = useState(() => {
    const obj = carrierData.find(cd => {
      return cd.sizes.find(size => size.value === data.parcel);
    });
    return obj.sizes.find(size => size.value === data.parcel);
  });

  const onCarrierChange = e => {
    const value = Number(e.target.value);
    setCarrierValue(() => {
      return carrierData.find(x => x.value === value);
    });
  };

  const onWeightChange = e => {
    const value = Number(e.target.value);
    setWeightValue(() => {
      const obj = carrierData.find(cd => cd.name === carrierValue.name);
      return obj.sizes.find(size => size.value === value);
    });
  };

  const onInputChange = e => {
    console.log("input got changed");
  };

  return (
    <tr>
      <td width="150px">
        <select value={carrierValue.value} onChange={onCarrierChange}>
          {carrierData.map(cd => (
            <option key={cd.name} value={cd.value}>
              {cd.name}
            </option>
          ))}
        </select>
      </td>
      <td width="150px">
        <select value={weightValue.value} onChange={onWeightChange}>
          {carrierData
            .find(cd => cd.name === carrierValue.name)
            ?.sizes.map(size => (
              <option key={size.name} value={size.value}>
                {size.name}
              </option>
            ))}
        </select>
      </td>
      <td width="100px">
        <input
          name="baseRate"
          value={baseRate}
          onChange={onInputChange}
          className="coverage-input form-control"
          type="text"
          aria-label="default input example"
        />
      </td>
      <td width="100px">
        <input
          name="additionalKm"
          value={additionalKm}
          onChange={onInputChange}
          className="coverage-input form-control"
          type="text"
          aria-label="default input example"
        />
      </td>
      <td width="100px">
        <input
          name="flatRate"
          value={flatRate}
          onChange={onInputChange}
          className="coverage-input form-control"
          type="text"
          aria-label="default input example"
        />
      </td>
      <td width="100px">
        <input
          name="riderCommission"
          value={riderCommission}
          onChange={onInputChange}
          className="coverage-input form-control"
          type="text"
          aria-label="default input example"
        />
      </td>
      <td width="100px">
        <input
          name="maximumDistance"
          value={maximumDistance}
          onChange={onInputChange}
          className="coverage-input form-control"
          type="text"
          aria-label="default input example"
        />
      </td>

      <td>
        {isEdit ? (
          <button onClick={toggleClick} className="btn btn-md edit-btn">
            <i className="fas fa-edit edit-ico"></i> Edit
          </button>
        ) : (
          <>
            <button onClick={toggleClick} className="btn edit-btn close-btn">
              <i className="fas fa-save save-ico"></i> Save
            </button>
            <button
              className="btn edit-btn remove-btn"
              // onClick={handleRemoveClick}
            >
              <i className="fas fa-trash trash-ico"></i> Cancel
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default SettingsApiCall;
