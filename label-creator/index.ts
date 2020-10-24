import {jsPDF,} from "jspdf";
import * as QRCode from 'qrcode'

const baseUrl = `https://vinotheque.jaedle.de`;
const labels = {
    width: 40,
    height: 40,
    leftBorder: 16,
    topBorder: 13.5,
    perLine: 4,
    rowsPerPage: 6,
    verticalDistance: 6,
    horizontalDistance: 6,
}

const pages = 10;


async function QrCodeFor(bottle: number) {
    return await QRCode.toBuffer(
        `${baseUrl}/link?bottle=${bottle}`,
        {
            type: "png",
            errorCorrectionLevel: "high",
            margin: 0,
        }
    );
}

const codeWidthHeight = (labels.width / 2) * Math.sqrt(2) * 0.9;


async function main() {


    async function addLabel(doc: jsPDF, startX: number, startY: number) {
        const centerX = startX + labels.width / 2;
        const centerY = startY + labels.height / 2;
        // doc.circle(
        //     centerX,
        //     centerY,
        //     labels.height / 2,
        //     'S'
        // );

        doc.addImage(await QrCodeFor(bottle), "png",
            centerX - codeWidthHeight / 2,
            centerY - codeWidthHeight / 2,
            codeWidthHeight,
            codeWidthHeight);
        doc.text(`${bottle}`,
            centerX,
            centerY - codeWidthHeight / 2,
            {align: "center", baseline: "bottom"}
        );
    }

    let bottle = 1;
    const doc = new jsPDF({
        format: 'A4'
    });
    for (let page = 1; page <= pages; page++) {
        for (let row = 0; row < labels.rowsPerPage; row++) {
            const startY = labels.topBorder
                + row * labels.verticalDistance
                + row * labels.height;
            for (let labelInLine = 0; labelInLine < labels.perLine; labelInLine++) {
                const startX = labels.leftBorder
                    + labels.width * labelInLine
                    + labels.horizontalDistance * labelInLine;
                await addLabel(doc, startX, startY);

                bottle++;
            }
        }
        if (page != pages) {
            doc.addPage();
        }
    }
    doc.save(`output/labels.pdf`);
    doc.close();

}

main();
