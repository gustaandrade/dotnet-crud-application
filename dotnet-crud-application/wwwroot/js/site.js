const uri = "api/AdItems";
let ads = [];

function getAds() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error("Unable to get items.", error));
}

function addAd() {
    const adBrandInput = document.getElementById("ad-brand");
    const adModelInput = document.getElementById("ad-model");
    const adVersionInput = document.getElementById("ad-version");
    const adYearInput = document.getElementById("ad-year");
    const adKmInput = document.getElementById("ad-km");
    const adDetailInput = document.getElementById("ad-detail");

    const item = {
        brand: adBrandInput.value.trim(),
        model: adModelInput.value.trim(),
        version: adVersionInput.value.trim(),
        year: adYearInput.value.trim(),
        km: adKmInput.value.trim(),
        detail: adDetailInput.value.trim()
    };

    fetch(uri, {
        method: "POST",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getAds();
            adBrandInput.value = "";
            adModelInput.value = "";
            adVersionInput.value = "";
            adYearInput.value = "";
            adKmInput.value = "";
            adDetailInput.value = "";
        })
        .catch(error => console.error("Unable to add item.", error));
}

function deleteAd(id) {
    fetch(`${uri}/${id}`, {
        method: "DELETE"
    })
        .then(() => getAds())
        .catch(error => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
    const editAd = ads.find(ad => ad.id === id);

    document.getElementById("edit-ad-id").value = editAd.id;
    document.getElementById("edit-ad-brand").value = item.brand;
    document.getElementById("edit-ad-model").value = item.model;
    document.getElementById("edit-ad-version").value = item.version;
    document.getElementById("edit-ad-year").value = item.year;
    document.getElementById("edit-ad-km").value = item.km;
    document.getElementById("edit-ad-details").value = item.details;
    document.getElementById("editForm").style.display = "block";
}

function updateAd() {
    const adId = document.getElementById("edit-ad-id").value;
    const ad = {
        id: parseInt(adId, 10),
        brand: document.getElementById("edit-ad-brand").value,trim(),
        model: document.getElementById("edit-ad-model").value.trim(),
        version: document.getElementById("edit-ad-version").value.trim(),
        year: document.getElementById("edit-ad-year").value.trim(),
        km: document.getElementById("edit-ad-km").value.trim(),
        details: document.getElementById("edit-ad-details").value.trim(),
    };

    fetch(`${uri}/${adId}`, {
        method: "PUT",
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify(ad)
    })
        .then(() => getAds())
        .catch(error => console.error("Unable to update item.", error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById("editForm").style.display = "none";
}

function _displayCount(adCount) {
    const name = (adCount === 1) ? "ad" : "ads";

    document.getElementById("counter").innerText = `${adCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById("ads");
    tBody.innerHTML = "";

    _displayCount(data.length);

    const button = document.createElement("button");

    data.forEach(ad => {
        const editButton = button.cloneNode(false);
        editButton.innerText = "Edit";
        editButton.setAttribute("onclick", `displayEditForm(${ad.id})`);

        const deleteButton = button.cloneNode(false);
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick", `deleteItem(${ad.id})`);

        const tr = tBody.insertRow();

        const td1 = tr.insertCell(0);
        const brandNode = document.createTextNode(ad.brand);
        td1.appendChild(brandNode);

        const td2 = tr.insertCell(1);
        const modelNode = document.createTextNode(ad.model);
        td2.appendChild(modelNode);

        const td3 = tr.insertCell(2);
        const versionNode = document.createTextNode(ad.version);
        td3.appendChild(versionNode);

        const td4 = tr.insertCell(3);
        const yearNode = document.createTextNode(ad.year);
        td4.appendChild(yearNode);

        const td5 = tr.insertCell(4);
        const kmNode = document.createTextNode(ad.km);
        td5.appendChild(kmNode);

        const td6 = tr.insertCell(0);
        const detailsNode = document.createTextNode(ad.details);
        td6.appendChild(detailsNode);

        const td7 = tr.insertCell(2);
        td7.appendChild(editButton);

        const td8 = tr.insertCell(3);
        td8.appendChild(deleteButton);
    });

    ads = data;
}