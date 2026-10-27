document.addEventListener("DOMContentLoaded", function () {
    const currencies = [
        { code: "USD", name: "دولار أمريكي (USD)" },
        { code: "EGP", name: "جنيه مصري (EGP)" },
        { code: "SAR", name: "ريال سعودي (SAR)" },
        { code: "AED", name: "درهم إماراتي (AED)" },
        { code: "EUR", name: "يورو (EUR)" },
        { code: "GBP", name: "جنيه إسترليني (GBP)" },
        { code: "KWD", name: "دينار كويتي (KWD)" },
        { code: "QAR", name: "ريال قطري (QAR)" },
        { code: "JOD", name: "دينار أردني (JOD)" },
        { code: "TRY", name: "ليرة تركية (TRY)" },
        { code: "CAD", name: "دولار كندي (CAD)" },
        { code: "JPY", name: "ين ياباني (JPY)" }
    ];

    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');

    function populateCurrencies() {
        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            option1.value = currency.code;
            option1.textContent = currency.name;

            const option2 = option1.cloneNode(true);

            fromSelect.appendChild(option1);
            toSelect.appendChild(option2);
        });

        fromSelect.value = "USD";
        toSelect.value = "EGP";
    }

    populateCurrencies();
    convertCurrency();
});

function swapCurrencies() {
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
    convertCurrency();
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    const from = fromSelect.value;
    const to = toSelect.value;
    const loader = document.getElementById('loader');
    const resultBox = document.getElementById('resultBox');
    const resultText = document.getElementById('resultText');
    const rateDetail = document.getElementById('rateDetail');

    if (!amount || amount <= 0) {
        alert("الرجاء إدخال مبلغ صحيح!");
        return;
    }

    loader.classList.remove('hidden');
    resultBox.classList.add('hidden');

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            resultText.innerText = `${convertedAmount} ${to}`;
            rateDetail.innerText = `1 ${from} = ${rate.toFixed(4)} ${to}`;
            
            resultBox.classList.remove('hidden');
        } else {
            throw new Error("فشل في تجديد أسعار العملات");
        }
    } catch (error) {
        console.error(error);
        alert("حدث خطأ أثناء جلب أسعار الصرف. تأكد من اتصالك بالإنترنت.");
    } finally {
        loader.classList.add('hidden');
    }
}