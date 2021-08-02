import { triggerBase64Download } from "react-base64-downloader";
import Button from "@material-ui/core/Button";
import * as htmlToImage from "html-to-image";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import companyLogo from "./../images/logo.png";
import profilePlaceholderImage from "./../images/profile_placeholder_image.png";

var vCardsJS = require('vcards-js');

export function QRCodeWithUserDetails({ userImage, userData }) {
  const [ downloadEnabled, setDownloadEnabled ] = useState(true);
  const [ downloadQRImageName, setDownloadQRImageName ] = useState(`${userData.displayName}`);
  const [ qrCodeBase64Encoding, setQrCodeBase64Encoding ] = useState("");
  
  var card = getVCard(userData);
  let imageObject = {
    src: companyLogo,
    height: 80,
    width: 80,
    excavate: false,
  };
  useEffect(() => {
    setTimeout(() => {
      generate(setDownloadEnabled, setQrCodeBase64Encoding);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <div id="qr-code" style={{ padding: "20px", border: '0px solid red' }}>
        <img
          src={userImage}
          onError={(e) => (e.target.onerror = null, e.target.src = profilePlaceholderImage)}
          width="60"
          height="60"
          style={{ borderRadius: "200px" }}
        />
        <div className="user">
          <p style={{ paddingLeft: "0px", margin: "0px" }}>
            <strong>{userData.displayName}</strong> <br />{" "}
            {userData.jobTitle || ""}
          </p>
        </div>
        <br />
        <QRCode
          value={card}
          size={300}
          fgColor={"#1A4074"}
          level={"L"}
          renderAs={"canvas"}
          imageSettings={imageObject}
        />
        <br />
      </div>
      <br></br>
      <Button
        key={`${downloadEnabled}`}
        disabled={downloadEnabled}
        variant="contained"
        color="primary"
        onClick={() =>
          triggerBase64Download(qrCodeBase64Encoding, downloadQRImageName)
        }
      >
        Download
      </Button>
    </div>
  );
}

function generate(setDownloadEnabled, setQrCodeBase64Encoding) {
  var node = document.getElementById("qr-code");
  htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      setQrCodeBase64Encoding(dataUrl);
      setDownloadEnabled(false);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function getVCard(userData) {
  //create a new vCard
  var vCard = vCardsJS();
  //set properties
  vCard.firstName = userData.givenName;
  vCard.lastName = userData.surname;
  vCard.organization = "Firmenich";
  vCard.url = "https://www.firmenich.com";
  vCard.title = userData.jobTitle;
  vCard.email = userData.mail || userData.userPrincipalName;
  vCard.workPhone =
    userData.businessPhones && userData.businessPhones.join(",");
  vCard.cellPhone = userData.mobilePhone;
  vCard.workAddress.label = 'Office Location';
  vCard.workAddress.street = userData.officeLocation;
  console.log(vCard.getFormattedString());
  return vCard.getFormattedString();
}