import React, { useEffect, useState } from "react";
import "./SettingsContent.css";
import axios from "../../hooks/auth/useHttpClient";
import { Select, MenuItem } from "@material-ui/core";
import SettingsApiCall from "./SettingApiCall";
import MaterialTable from "material-table";

const fetchData = async () => {
  const res = await axios.get(
    "https://api.myverigo.com/api/services/app/Partner/GetPrices"
  );
  return res;
};

const fetchCarrierData = async () => {
  const res = await axios.get(
    "https://api.myverigo.com/api/services/app/Partner/GetCarriers"
  );
  return res;
};

const SettingsTable = () => {
  const [carrierData, setCarrierData] = useState([]);
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const doRequest = async () => {
      setLoading(true);

      const [resCarrier, resData] = await Promise.all([
        fetchCarrierData(),
        fetchData(),
      ]);

      setLoading(false);

      setCarrierData(resCarrier.data.result.data);
      setData(resData.data.result.data);
    };

    doRequest();
  }, []);

  useEffect(() => {
    if (!data.length || !carrierData.length) return;

    setTableData(() => {
      return data.map(data => {
        const cd = carrierData.find(cd => cd.value === data.carrier);
        const weight = cd.sizes.find(size => size.value === data.parcel);
        return {
          carrier: cd.name,
          parcel: weight.name,
          baseRate: data.baseRate,
          additionalKm: data.additionalKm,
          flatRate: data.flatRate,
          maximumDistance: data.maximumDistance,
          riderCommission: data.riderCommission,
        };
      });
    });
  }, [carrierData, data]);

  const handleAddClick = e => {};

  const columns = [
    {
      title: "Carrier",
      field: "carrier",
      editComponent: ({ value, onRowDataChange, rowData }) => {
        const tValue = carrierData.find(cd => cd.name === value);

        return (
          <Select
            value={tValue?.value || ""}
            onChange={event => {
              const value = carrierData.find(
                cd => cd.value === event.target.value
              );
              onRowDataChange({
                ...rowData,
                carrier: value.name,
              });
            }}
          >
            {carrierData.map(cd => (
              <MenuItem key={cd.name} value={cd.value}>
                {cd.name}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Weight",
      field: "parcel",
      editComponent: ({ value, onRowDataChange, rowData }) => {
        const cd = carrierData.find(cd => cd.name === rowData.carrier);
        const tValue = cd?.sizes.find(size => size.name === value);

        return (
          <Select
            value={tValue?.value || ""}
            onChange={event => {
              const cd = carrierData.find(cd => cd.name === rowData.carrier);
              const parcel = cd?.sizes.find(
                size => size.value === event.target.value
              );
              onRowDataChange({
                ...rowData,
                parcel: parcel.name,
              });
            }}
          >
            {carrierData
              .find(cd => cd.name === rowData.carrier)
              ?.sizes.map(size => (
                <MenuItem key={size.name} value={size.value}>
                  {size.name}
                </MenuItem>
              ))}
          </Select>
        );
      },
    },
    { title: "First km Rate", field: "baseRate", type: "numeric" },
    { title: "Additional km Rate", field: "additionalKm", type: "numeric" },
    { title: "Flat Rate", field: "flatRate", type: "numeric" },
    {
      title: "(%) Rider's Commission",
      field: "riderCommission",
      type: "numeric",
    },
    { title: "Max.(km) Distance", field: "maximumDistance", type: "numeric" },
  ];

  if (loading) {
    return (
      <table
        table="true"
        className="table table-striped table-bordered table-hover"
      >
        <tbody>
          <tr className="spinner-grow" role="status">
            <td className="visually-hidden">Loading...</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="settings--table table-responsive-xxl">
      <button className="btn btn-verigo" onClick={handleAddClick}>
        <i className="fas fa-plus plus-ico"></i> Add
      </button>
      <br />
      <MaterialTable
        columns={columns}
        data={tableData}
        options={{ search: false }}
        editable={{
          onRowAdd: newData => {
            return new Promise(resolve => resolve());
          },
          onRowUpdate: (newData, oldData) => {
            // ignore. just for testing
            return new Promise(resolve => {
              setTableData(currentTableData => {
                const newTableData = currentTableData.map(td => {
                  if (td.tableData.id === oldData.tableData.id) {
                    return { ...oldData, ...newData };
                  } else {
                    return td;
                  }
                });
                return newTableData;
              });
              resolve();
            });
          },
          onRowDelete: oldData => {
            return new Promise(resolve => resolve());
          },
        }}
      />
      <br />
      <br />
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
          {loading ? (
            <tr className="spinner-grow" role="status">
              <td className="visually-hidden">Loading...</td>
            </tr>
          ) : (
            data.map(d => {
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
