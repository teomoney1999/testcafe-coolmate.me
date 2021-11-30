import { Workbook } from "excel4node";
import { percentagesCalc } from "./test-coolmate.me/reports/helper.js";
import report from "./test-coolmate.me/reports/json/report_cart_Tue Nov 30 2021 14:48:40 GMT+0700 (Indochina Time).json";

const feature = "cart"; 
// const feature = "payment"; 
// const feature = "search"; 

const reportFileName = `${feature}_report_${new Date()}`;

const generateReport = (reportFileName) => {
  if (!reportFileName) {
    reportFileName = `Test_${new Date()}`;
  }

  if (!report) {
    console.log("Can not get report file!");
    return null;
  }

  const style = {
    border: {
      left: { style: "medium", color: "#000000" },
      right: { style: "medium", color: "#000000" },
      top: { style: "medium", color: "#000000" },
      bottom: { style: "medium", color: "#000000" },
    },
    font: {
      bold: true,
      color: "#000000",
    },
    fill: {
      type: "pattern",
    },
  };

  const wb = new Workbook();

  const ws = wb.addWorksheet("Report");

  ws.cell(3, 1).string("TC ID").style(style);
  ws.cell(3, 2).string("Result").style(style);

  const fixtures = report.fixtures;

  let beginRowIdx = 4;
  let result;
  let passCount = 0,
    failedCount = 0;

  for (const fixture of fixtures) {
    const tests = fixture.tests;
    for (let i = 0; i < tests.length; i++) {
      style["font"]["color"] = "#000000";
      ws.cell(beginRowIdx, 1).string(tests[i].name).style(style);

      if (!tests[i].errs.length) {
        result = "PASS";
        passCount++;
        // style.fill["bgColor"] = "#ff0000";
        style["font"]["color"] = "#33cc00";
      } else {
        result = "FAILED";
        failedCount++;
        // style.fill["bgColor"] = "#40ff00";
        style["font"]["color"] = "#ff0000";
      }

      // ws.cell(beginRowIdx, 2).string(result);
      ws.cell(beginRowIdx, 2).string(result).style(style);
      beginRowIdx++;
    }
  }

  const passRow = beginRowIdx + 1;
  ws.cell(passRow, 1).string("PASS");
  ws.cell(passRow, 2).string(
    percentagesCalc(passCount / fixtures[0].tests.length)
  );

  const failedRow = passRow + 1;
  ws.cell(failedRow, 1).string("FAILED");
  ws.cell(failedRow, 2).string(
    percentagesCalc(failedCount / fixtures[0].tests.length)
  );

  wb.write(`./test-coolmate.me/reports/excel/${reportFileName}.xlsx`);
};

generateReport(reportFileName);
