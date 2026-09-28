const damatebisGilakebi = document.querySelectorAll(".damatebis-gilaki");

const raodenobisElementi = document.querySelector("#kalatis-raodenoba");
const gasuftavebisGilaki = document.querySelector("#kalatis-gasuftaveba");

const amogebisGilaki = document.querySelector("#ertis-amogeba");
const jamisElementi = document.querySelector("#kalatis-jami");

const kalatisProduqtebisSia = document.querySelector("#kalatis-produqtebi");
const gadaxdilisGilaki = document.querySelector("#gadaxdilis-gilaki");

const shetyobinebisFoni = document.querySelector("#shetyobinebis-foni");

const shetyobinebisDaxurva = document.querySelector("#shetyobinebis-daxurva");

const kalatisProduqtebi =
    JSON.parse(localStorage.getItem("kalatisProduqtebi")) || [];

damatebisGilakebi.forEach(function (gilaki) {
    gilaki.addEventListener("click", function () {
        const produqtisSaxeli = gilaki.dataset.saxeli;
        const produqtisFasi = Number(gilaki.dataset.fasi);

        const produqti = {
            saxeli: produqtisSaxeli,
            fasi: produqtisFasi
        };

        kalatisProduqtebi.push(produqti);

        ganvaaxlotKalata();
    });
});

amogebisGilaki.addEventListener("click", function () {
    if (kalatisProduqtebi.length === 0) {
        return;
    }

    kalatisProduqtebi.pop();

    ganvaaxlotKalata();
});

gasuftavebisGilaki.addEventListener("click", function () {
    kalatisProduqtebi.length = 0;

    ganvaaxlotKalata();
});

gadaxdilisGilaki.addEventListener("click", function () {
    shetyobinebisFoni.classList.add("chans");
});

shetyobinebisDaxurva.addEventListener("click", function () {
    shetyobinebisFoni.classList.remove("chans");
});

function ganvaaxlotKalata() {
    const nivtebisRaodenoba = kalatisProduqtebi.length;

    let saertoFasi = 0;

    kalatisProduqtebi.forEach(function (produqti) {
        saertoFasi = saertoFasi + produqti.fasi;
    });

    raodenobisElementi.textContent = nivtebisRaodenoba;
    jamisElementi.textContent = saertoFasi;

    const kalataCarielia = nivtebisRaodenoba === 0;

    amogebisGilaki.disabled = kalataCarielia;
    gasuftavebisGilaki.disabled = kalataCarielia;

    gamoachinetKalatisProduqtebi();
    sheinaxetKalata();
}

function gamoachinetKalatisProduqtebi() {
    kalatisProduqtebisSia.innerHTML = "";

    if (kalatisProduqtebi.length === 0) {
        const carieliTeqsti = document.createElement("li");

        carieliTeqsti.className = "carieli-kalatis-teqsti";
        carieliTeqsti.textContent = "კალათა ცარიელია.";

        kalatisProduqtebisSia.append(carieliTeqsti);

        return;
    }

    kalatisProduqtebi.forEach(function (produqti, indeqsi) {
        const pirveliIndeqsi = kalatisProduqtebi.findIndex(function (item) {
            return item.saxeli === produqti.saxeli;
        });

        if (indeqsi !== pirveliIndeqsi) {
            return;
        }

        const ertnairiProduqtebi = kalatisProduqtebi.filter(function (item) {
            return item.saxeli === produqti.saxeli;
        });

        const produqtisRaodenoba = ertnairiProduqtebi.length;

        const produqtebisJami =
            produqti.fasi * produqtisRaodenoba;
        
        const siisElementi = document.createElement("li");
        siisElementi.className = "kalatis-produqti";

        const saxelisElementi = document.createElement("span");
        saxelisElementi.textContent = produqti.saxeli;

        const raodenobisNishani = document.createElement("span");
        raodenobisNishani.className = "raodenobis-nishani";
        raodenobisNishani.textContent = `×${produqtisRaodenoba}`;

        const saxeliDaRaodenoba = document.createElement("div");
        saxeliDaRaodenoba.className = "saxeli-da-raodenoba";
        saxeliDaRaodenoba.append(saxelisElementi, raodenobisNishani);

        const minusGilaki = document.createElement("button");
        minusGilaki.textContent = "-";

        minusGilaki.className = "raodenobis-gilaki minus-gilaki";

        minusGilaki.addEventListener("click", function () {
            const shemtxvevisIndeqsi = kalatisProduqtebi.findIndex(function (item) {
                return item.saxeli === produqti.saxeli;
            });

            kalatisProduqtebi.splice(shemtxvevisIndeqsi, 1);

            ganvaaxlotKalata();
        });

        const plusGilaki = document.createElement("button");
        plusGilaki.textContent = "+";

        plusGilaki.className = "raodenobis-gilaki plus-gilaki";

        plusGilaki.addEventListener("click", function () {
            kalatisProduqtebi.push(produqti);

            ganvaaxlotKalata();
        });

        const fasisElementi = document.createElement("span");
        fasisElementi.className = "kalatis-produqtis-fasi";
        fasisElementi.textContent = `${produqtebisJami} ₾`;

        const washLisGilaki = document.createElement("button");
        washLisGilaki.className = "washlis-gilaki";
        washLisGilaki.textContent = "წაშლა";

        washLisGilaki.addEventListener("click", function () {
            for (let i = kalatisProduqtebi.length - 1; i >= 0; i--) {
                if (kalatisProduqtebi[i].saxeli === produqti.saxeli) {
                    kalatisProduqtebi.splice(i, 1);
                }
            }

            ganvaaxlotKalata();
        });

        siisElementi.append(
            saxeliDaRaodenoba,
            fasisElementi,
            minusGilaki,
            plusGilaki,
            washLisGilaki
        );
        kalatisProduqtebisSia.append(siisElementi);
    });
}

function sheinaxetKalata() {
    localStorage.setItem(
        "kalatisProduqtebi",
        JSON.stringify(kalatisProduqtebi)
    );
}

ganvaaxlotKalata();