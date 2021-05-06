import React, { useEffect, useState } from "react";
import "./SettingsContent.css";
import axios from "../../hooks/auth/useHttpClient";
import { Select, MenuItem } from "@material-ui/core";
import SettingsApiCall from "./SettingApiCall";
import MaterialTable from "material-table";

const SettingsTable = () => {
  const [{ loading: loadingData, data }, setData] = useState({
    loading: false,
    data: [],
  });
  const [
    { loading: loadingCarrierData, carrierData },
    setCarrierData,
  ] = useState({
    loading: false,
    carrierData: [],
  });

  const [loader, setLoader] = useState(true);

  const [carrierValue, setCarrierValue] = useState(() => {
    return carrierData.find((cd) => cd.value === data.carrier);
  });
  const [weightValue, setWeightValue] = useState(() => {
    const obj = carrierData.find((cd) => {
      return cd.sizes.find((size) => size.value === data.parcel);
    });
    return obj.sizes.find((size) => size.value === data.parcel);
  });

  const onCarrierChange = (e) => {
    const value = Number(e.target.value);
    setCarrierValue(() => {
      return carrierData.find((x) => x.value === value);
    });
  };
  const onWeightChange = (e) => {
    const value = Number(e.target.value);
    setWeightValue(() => {
      const obj = carrierData.find((cd) => cd.name === carrierValue.name);
      return obj.sizes.find((size) => size.value === value);
    });
  };
  const columns = [
    {
      title: "Carrier",
      field: "carrier",
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <>
          <select value={carrierValue.value} onChange={onCarrierChange}>
            {carrierData.map((cd) => (
              <option key={cd.name} value={cd.value}>
                {cd.name}
              </option>
            ))}
          </select>
        </>
      ),
    },
    {
      title: "Weight",
      field: "parcel",
      editComponent: ({ value, onRowDataChange, rowData }) => (
        <>
          <select value={weightValue.value} onChange={onWeightChange}>
            {carrierData
              .find((cd) => cd.name === carrierValue.name)
              ?.sizes.map((size) => (
                <option key={size.name} value={size.value}>{size.name}</option>
              ))}
          </select>
        </>
      ),
    },
    { title: "Base Rate", field: "baseRate", type: "numeric" },
    { title: "Additional KM Rate", field: "additionalKm", type: "numeric" },
    { title: "Flat Rate", field: "flatRate", type: "numeric" },
    { title: "Rider's Commission", field: "riderCommission", type: "numeric" },
    { title: "Maximum Distance", field: "maximumDistance", type: "numeric" },
  ];

  useEffect(() => {
    async function my() {
      setData((data) => ({ ...data, loading: true }));

      const res = await axios.get(
        "https://api.myverigo.com/api/services/app/Partner/GetPrices"
      );
      setData((data) => ({
        ...data,
        loading: false,
        data: res.data.result.data,
      }));
      setLoader(false);

      console.log("data", res.data.result.data);
    }
    my();
  }, []);
  //==============================================//
  //CARRIER API
  //==============================================//
  useEffect(() => {
    async function myCarriers() {
      setCarrierData((data) => ({ ...data, loading: true }));

      const resCarriers = await axios.get(
        "https://api.myverigo.com/api/services/app/Partner/GetCarriers"
      );
      console.log("Carrier data", resCarriers.data.result.data);

      setCarrierData((data) => ({
        ...data,
        loading: false,
        carrierData: resCarriers.data.result.data,
      }));
    }
    myCarriers();
  }, []);

  return (
    <div className="settings--table table-responsive-xxl">
      <br />
      <MaterialTable
        title=""
        data={data}
        carrierData={carrierData}
        isLoading={loader}
        columns={columns}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Carrier</th>
            <th scope="col">Weight</th>
            <th scope="col">First km Rate </th>
            <th scope="col">Additional km Rate</th>
            <th scope="col">Flat Rate</th>
            <th scope="col">(%) Rider's Commission</th>
            <th scope="col"> Max.(km) Distance</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loadingCarrierData || loadingData ? (
            <tr className="spinner-grow" role="status">
              <td className="visually-hidden">Loading...</td>
            </tr>
          ) : (
            data.map((d) => {
              return (
                <SettingsApiCall
                  key={d.id}
                  carrierData={carrierData}
                  data={d}
                  baseRate={d.baseRate}
                  additionalKm={d.additionalKm}
                  flatRate={d.flatRate}
                  riderCommission={d.riderCommission}
                  maximumDistance={d.maximumDistance}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SettingsTable;
