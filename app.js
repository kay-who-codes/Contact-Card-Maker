document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input');
    const downloadVCardBtn = document.getElementById('downloadVCard');
    const downloadQRBtn = document.getElementById('downloadQR');
    const qrcodeDiv = document.getElementById('qrcode');
    let qr = null;

    function generateVCard() {
        const getValue = id => document.getElementById(id).value.trim();
        
        const vCard = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            `N:${getValue('lastName')};${getValue('firstName')};;;`,
            `FN:${getValue('firstName')} ${getValue('lastName')}`,
            getValue('company') && `ORG:${getValue('company')}`,
            getValue('jobPosition') && `TITLE:${getValue('jobPosition')}`,
            getValue('primaryPhone') && `TEL;TYPE=CELL:${getValue('primaryPhone')}`,
            getValue('secondaryPhone') && `TEL;TYPE=WORK:${getValue('secondaryPhone')}`,
            getValue('primaryEmail') && `EMAIL;TYPE=Personal:${getValue('primaryEmail')}`,
            getValue('secondaryEmail') && `EMAIL;TYPE=WORK:${getValue('secondaryEmail')}`,
            getValue('homeAddress') && `ADR;TYPE=HOME:;;${getValue('homeAddress').replace(/,/g, ';')}`,
            getValue('workAddress') && `ADR;TYPE=WORK:;;${getValue('workAddress').replace(/,/g, ';')}`,
            getValue('primaryUrl') && `URL:${getValue('primaryUrl')}`,
            getValue('secondaryUrl') && `URL:${getValue('secondaryUrl')}`,
            getValue('tertiaryUrl') && `URL:${getValue('tertiaryUrl')}`,
            getValue('note') && `NOTE:${getValue('note')}`,
            getValue('contactImage') && handleContactImage(),
            'END:VCARD'
        ].filter(line => line).join('\n');

        return vCard;
    }

    function handleContactImage() {
        const file = document.getElementById('contactImage').files[0];
        if (!file) return '';
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            return `PHOTO;ENCODING=b;TYPE=${file.type}:${base64}`;
        };
        return '';
    }

    function updateQRCode(vcardData) {
        qrcodeDiv.innerHTML = ''; // Clear the existing QR code
        qr = new QRCode(qrcodeDiv, {
            text: vcardData,
            width: 500,
            height: 500,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    function download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    function handleInput() {
        console.log('Input changed!'); // Debugging: Confirm the function is called
        const vcardData = generateVCard();
        updateQRCode(vcardData);
    }

    // Attach event listeners to all input fields
    inputs.forEach(input => input.addEventListener('input', handleInput));
    document.getElementById('contactImage').addEventListener('change', handleInput);

    downloadVCardBtn.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const filename = `${firstName}_${lastName}_contact.vcf`.replace(/ /g, '_') || 'contact.vcf';
        download(filename, generateVCard());
    });

    downloadQRBtn.addEventListener('click', () => {
        const canvas = qrcodeDiv.querySelector('canvas');
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'contact_qr.png';
        a.href = url;
        a.click();
    });

    // Initialize QR code with empty data
    handleInput();
});