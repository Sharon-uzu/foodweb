import React, { useState, useEffect, useRef } from "react";
import Footer from "../../Components/Footer";
import AdminHeader from "../DashComponents/AdminHeader";
import Sidebar from "../DashComponents/Sidebar";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { QRCodeCanvas } from "qrcode.react";
import img from "../../Assets/unsplash_eJ2NHoKZ1gY.png";
import { Supabase } from "../../config/supabase-config";
import { DevBaseUrl, LiveBaseUrl } from "../../utility";

const Tables = ({ userId, userDetails }) => {
  const [showModal, setShowModal] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [tables, setTables] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [buttonText, setButtonText] = useState("Create Table");
  const [loading, setLoading] = useState(true);
  const [qrData, setQrData] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const qrRef = useRef(null); // Reference for QR Code

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    const fetchAdminData = async () => {
      const { data: adminData, error: adminError } = await Supabase.from(
        "food-web-admin"
      )
        .select("business")
        .eq("id", userId)
        .single();

      if (adminError) {
        console.error("Error fetching business name:", adminError);
        setLoading(false);
        return;
      }

      setBusinessName(adminData?.business || "");
      fetchTables(userId);
    };

    const fetchTables = async (adminId) => {
      const { data: tablesData, error: tablesError } = await Supabase.from(
        "food-web-tables"
      )
        .select("*")
        .eq("adminid", adminId);

      if (tablesError) {
        console.error("Error fetching tables:", tablesError);
        setLoading(false);
        return;
      }

      setTables(tablesData || []);
      setLoading(false);
    };

    fetchAdminData();
  }, [userId]);

  const handleCreateTable = async () => {
    if (!userId || !businessName || !tableName.trim() || !tableNumber.trim()) {
      alert("All fields are required!");
      return;
    }

    setButtonText("Loading...");

    const { data, error } = await Supabase.from("food-web-tables")
      .insert([
        {
          adminid: userId,
          business: businessName,
          tablename: tableName,
          tablenumber: tableNumber,
        },
      ])
      .select();

    if (error) {
      console.error("Error creating table:", error);
      setButtonText("Create Table");
      return;
    }

    if (Array.isArray(data)) {
      setTables([...tables, ...data]);
    }

    setButtonText("Done!");
    setTimeout(() => {
      setShowModal(false);
      setTableName("");
      setTableNumber("");
      setButtonText("Create Table");
    }, 1500);
  };

  // Generate QR Code
  const generateQRCode = (tableNumber) => {
    const qrValue = `${LiveBaseUrl}/categories?vendorId=${userId}&business=${businessName}&tableNumber=${tableNumber}`;
    // const qrValue = `${DevBaseUrl}/categories?vendorId=${userId}&business=${businessName}&tableNumber=${tableNumber}`;
   
    setQrData(qrValue);
    setShowQRModal(true);
  };

  // Function to download QR code
  const downloadQRCode = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "table_qr_code.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <AdminHeader userDetails={userDetails}/>
      <div className="main">
        <Sidebar />
        <div className="main-right">
          <div className="meals">
            <div className="meals-c">
              <div className="meal-top">
                <h3>Tables</h3>
                <button onClick={() => setShowModal(true)}>Create Table</button>
              </div>
              <div className="admin-tables">
                {loading ? (
                  <div className="loader-container">
                    <div className="loader"></div>
                  </div>
                ) : tables.length > 0 ? (
                  tables.map((table) => (
                    <div
                      className="ad-table"
                      key={table.id}
                      onClick={() => generateQRCode(table.tablenumber)}
                      style={{ cursor: "pointer" }}
                    >
                      <img src={img} alt="Table" />
                      <h4>{table.tablename}</h4>
                      <div>
                        <p>{table.tablenumber}</p>
                        <IoIosArrowForward className="t-i" />
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: "20px",
                    }}
                  >
                    No tables found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Table Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>
              Create a New Table
              <button
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                <IoMdClose size={24} />
              </button>
            </h2>
            <input
              type="text"
              placeholder="Table Name"
              className="modal-input"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Table Number"
              className="modal-input"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <button
              className="modal-create-button"
              onClick={handleCreateTable}
              disabled={buttonText === "Loading..."}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 style={{ display: "flex", justifyContent: "end" }}>
              <button
                className="close-button"
                onClick={() => setShowQRModal(false)}
              >
                <IoMdClose size={24} />
              </button>
            </h2>
            <div ref={qrRef} style={{ textAlign: "center" }}>
              <QRCodeCanvas value={qrData} size={200} />
            </div>
            {/* <p>{qrData}</p> */}
            <button
              className="modal-download-button"
              style={{
                backgroundColor: "#FF7700",
                border: "none",
                padding: "6px 12px",
                color: "#fff",
                cursor: "pointer",
                borderRadius: "4px",
                marginTop: "5px",
              }}
              onClick={downloadQRCode}
            >
              Download QR Code
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Tables;
