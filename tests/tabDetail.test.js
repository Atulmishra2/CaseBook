/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import fs from "fs";
import path from "path";

describe("Case Detail Tab Suite (components/tabs/detail)", () => {
  const detailHtmlPath = path.resolve(__dirname, "../components/tabs/detail/tab-detail.html");
  const detailJsPath = path.resolve(__dirname, "../components/tabs/detail/tab-detail.js");
  const detailCssPath = path.resolve(__dirname, "../components/tabs/detail/tab-detail.css");

  const detailHtml = fs.readFileSync(detailHtmlPath, "utf8");
  const detailJs = fs.readFileSync(detailJsPath, "utf8");
  const detailCss = fs.readFileSync(detailCssPath, "utf8");

  const mockCases = [
    {
      id: "case-1",
      caseNo: "CS/200/2026",
      caseName: "RAMESH CHANDRA VS SURESH KUMAR",
      caseType: "civil",
      courtName: "Court No. 1, Civil Judge Sr. Div.",
      nextHearing: "2026-11-25",
      hearingProcess: "Evidence",
      plaintiff: "Ramesh Chandra",
      defendant: "Suresh Kumar",
      appearingFor: "Ramesh Chandra",
      clientName: "Ramesh Chandra",
      clientNumber: "9876543210",
      cnrNumber: "UPHC01002002026",
      filingDate: "2026-01-15",
      act: "Specific Relief Act Sec 34",
      remark: "Important matter for cross-examination."
    },
    {
      id: "case-2",
      caseNo: "CRI/405/2026",
      criminalCaseNumber: "CRI/405/2026",
      caseName: "STATE OF UP VS VIKRAM SINGH",
      caseType: "criminal",
      courtName: "Court No. 4, Addl. Sessions Judge",
      nextHearing: "2026-11-23",
      hearingProcess: "Arguments on Charge",
      plaintiff: "State of UP",
      defendant: "Vikram Singh",
      accusedName: "Vikram Singh",
      appearingFor: "Vikram Singh",
      clientNumber: "9123456780",
      policeStation: "Kotwali City",
      firNumber: "123/2025",
      crimeSection: "IPC 307 / 323 / 504",
      inCustody: false
    },
    {
      id: "case-3",
      caseNo: "DISP/101/2025",
      caseName: "MEERA DEVI VS ANIL DEVI",
      caseType: "family",
      courtName: "Family Court No. 1",
      nextHearing: "disposed",
      status: "disposed",
      disposalComment: "Decreed in favor of petitioner",
      hearingProcess: "Decided / Decreed",
      plaintiff: "Meera Devi",
      defendant: "Anil Devi"
    }
  ];

  beforeEach(() => {
    document.body.innerHTML = `<div id="detail" class="tab" data-detail-scope></div>`;
    window.allCaseRecords = [...mockCases];
    window.formatDateDMY = (d) => String(d || "—");
    window.getCaseHearingHistory = vi.fn((caseNo) => {
      if (caseNo === "CS/200/2026") {
        return [
          { hearing_date: "2026-10-10", stage: "Issues", remarks: "Issues framed. Adjourned for plaintiff evidence." },
          { hearing_date: "2026-09-01", stage: "Pleadings", remarks: "WS filed by defendant. Matter posted for issues." }
        ];
      }
      return [];
    });

    window.getCasePaisaTransactions = vi.fn((caseNo) => {
      if (caseNo === "CS/200/2026") {
        return [
          { date: "2026-10-10", description: "Advance Fee Payment", type: "received", amount: 30000 },
          { date: "2026-10-12", description: "Process Fee Expense", type: "spent", amount: 1500 }
        ];
      }
      return [];
    });

    window.getCaseTransferHistory = vi.fn((caseNo) => {
      if (caseNo === "CS/200/2026") {
        return [
          { transfer_date: "2026-08-01", from_court: "Court 3", to_court: "Court 1", order_number: "DJ/Order/44", transfer_reason: "Re-distribution" }
        ];
      }
      return [];
    });

    window.getCaseTasksHistory = vi.fn((caseNo) => {
      if (caseNo === "CS/200/2026") {
        return [
          { deadlineDate: "2026-11-24", taskTitle: "Prepare affidavit of witness PW-1", priority: "high", status: "pending" }
        ];
      }
      return [];
    });

    // Evaluate tab-detail.js
    window.__casebook_tabs = window.__casebook_tabs || {};
    eval(detailJs);

    // Mount HTML
    const detailEl = document.getElementById("detail");
    detailEl.innerHTML = window.__casebook_tabs["detail"];
  });

  it("1. HTML and JS template mount properly into DOM", () => {
    expect(window.__casebook_tabs["detail"]).toBeTruthy();
    expect(document.querySelector("[data-detail-scope]")).not.toBeNull();
    expect(document.querySelector(".detail-hero-card")).not.toBeNull();
  });

  it("2. Strict CSS isolation - CSS is scoped under :is(#detail, [data-detail-scope])", () => {
    expect(detailCss).toContain(":is(#detail, [data-detail-scope])");
    expect(detailCss).toContain(".act.primary");
    expect(detailCss).toContain(".act svg");
  });

  it("3. Lucide icons are used exclusively in the markup without emojis or font-awesome", () => {
    expect(detailHtml).toContain("lucide lucide-file-text");
    expect(detailHtml).toContain("lucide lucide-search");
    expect(detailHtml).toContain("lucide lucide-copy");
    expect(detailHtml).toContain("lucide lucide-calendar-plus");
    expect(detailHtml).toContain("lucide lucide-phone");
    expect(detailHtml).toContain("lucide lucide-message-circle");
    expect(detailHtml).not.toContain("fa-");
    expect(detailHtml).not.toContain("fas ");
  });

  it("4. Hydrates civil case properly with real database fields: nextHearing, clientNumber, hearingProcess", () => {
    window.loadCaseInDetailTab("CS/200/2026");

    expect(document.getElementById("detailCaseNumberText").textContent).toBe("CS/200/2026");
    expect(document.getElementById("detailPetitionerName").textContent).toBe("Ramesh Chandra");
    expect(document.getElementById("detailRespondentName").textContent).toBe("Suresh Kumar");
    expect(document.getElementById("detailCnrText").textContent).toBe("UPHC01002002026");
    expect(document.getElementById("detailTypeText").textContent).toBe("Civil Suit");
    expect(document.getElementById("detailStatusText").textContent).toBe("Pending");
    expect(document.getElementById("detailNextHearingDate").textContent).toBe("2026-11-25");
    expect(document.getElementById("detailCurrentStage").textContent).toBe("Evidence");
  });

  it("5. Universal Action Buttons Standard (.act) adherence with client phone link", () => {
    window.loadCaseInDetailTab("CS/200/2026");

    const primaryBtn = document.getElementById("detailActForwardDate");
    expect(primaryBtn.classList.contains("primary")).toBe(true);
    expect(primaryBtn.textContent).toContain("Update Next Date");

    const callBtn = document.getElementById("detailActCall");
    expect(callBtn.getAttribute("href")).toBe("tel:9876543210");
    expect(callBtn.classList.contains("act-call")).toBe(true);

    const waBtn = document.getElementById("detailActWhatsApp");
    expect(waBtn.getAttribute("href")).toContain("wa.me/919876543210");
    expect(waBtn.classList.contains("act-whatsapp")).toBe(true);

    const slipBtn = document.getElementById("detailActPassOver");
    expect(slipBtn.classList.contains("act-passover")).toBe(true);

    const printBtn = document.getElementById("detailActPrint");
    expect(printBtn.classList.contains("act-dossier")).toBe(true);
  });

  it("6. Segment navigation switches between panels and correctly calls CaseBook services", () => {
    window.loadCaseInDetailTab("CS/200/2026");

    // Switch to Panel 1 (Court & Bench)
    window.selectDetailSegment(1);
    expect(document.getElementById("detailPanel1").classList.contains("active")).toBe(true);
    expect(window.getCaseTransferHistory).toHaveBeenCalledWith("CS/200/2026");
    expect(document.getElementById("detailTransferHistoryBody").textContent).toContain("Court 3 ➔ Court 1");

    // Switch to Panel 3 (Order Sheet & Proceedings)
    window.selectDetailSegment(3);
    expect(document.getElementById("detailPanel3").classList.contains("active")).toBe(true);
    expect(window.getCaseHearingHistory).toHaveBeenCalledWith("CS/200/2026");
    expect(document.getElementById("detailHistoryCountBadge").textContent).toBe("2");
    expect(document.getElementById("detailProceedingsTimelineStream").textContent).toContain("Issues framed");

    // Switch to Panel 4 (Fees & Financials via getCasePaisaTransactions)
    window.selectDetailSegment(4);
    expect(document.getElementById("detailPanel4").classList.contains("active")).toBe(true);
    expect(window.getCasePaisaTransactions).toHaveBeenCalledWith("CS/200/2026");
    expect(document.getElementById("detailFeeReceivedVal").textContent).toContain("30,000");
    expect(document.getElementById("detailFeeSpentVal").textContent).toContain("1,500");
    expect(document.getElementById("detailFeeBalanceVal").textContent).toContain("28,500");

    // Switch to Panel 5 (Notes & Tasks via getCaseTasksHistory)
    window.selectDetailSegment(5);
    expect(document.getElementById("detailPanel5").classList.contains("active")).toBe(true);
    expect(window.getCaseTasksHistory).toHaveBeenCalledWith("CS/200/2026");
    expect(document.getElementById("detailTasksCountBadge").textContent).toBe("1");
    expect(document.getElementById("detailTasksTableBody").textContent).toContain("Prepare affidavit of witness PW-1");
  });

  it("7. Hydrates criminal case correctly with policeStation and crimeSection", () => {
    window.loadCaseInDetailTab("CRI/405/2026");

    expect(document.getElementById("detailTypeText").textContent).toBe("State / Criminal");
    expect(document.getElementById("detailPetitionerRole").textContent).toBe("PROSECUTION / STATE");
    expect(document.getElementById("detailSpecializedTableBody").textContent).toContain("Kotwali City");
    expect(document.getElementById("detailSpecializedTableBody").textContent).toContain("123/2025");
  });

  it("8. Hydrates disposed case correctly with disposalComment and closed status", () => {
    window.loadCaseInDetailTab("DISP/101/2025");

    expect(document.getElementById("detailStatusText").textContent).toBe("Disposed");
    expect(document.getElementById("detailNextHearingDate").textContent).toBe("Decided / Disposed");
    expect(document.getElementById("detailSpecializedTableBody").textContent).toContain("Decreed in favor of petitioner");
  });

  it("9. Global openCaseDetailTab navigates and sets target case in sessionStorage", () => {
    const showTabSpy = vi.fn();
    window.showTab = showTabSpy;

    window.openCaseDetailTab("CS/200/2026");
    expect(showTabSpy).toHaveBeenCalledWith("detail");
    expect(sessionStorage.getItem("detail_target_case")).toBe("CS/200/2026");
  });

  it("10. Correctly parses party1 and party2 from case title even if plaintiff field was swapped or partial", () => {
    const testCase = {
      caseNo: "421",
      caseName: "Prathvipal vs Banvari & others",
      plaintiff: "Banvari & others",
      clientName: "Raj Kumar",
      courtName: "Civil Judge Senior Division",
      nextHearing: "2026-12-05",
      stage: "Evidence"
    };
    window.allCaseRecords = [testCase];
    window.loadCaseInDetailTab("421");

    expect(document.getElementById("detailPetitionerName").textContent).toBe("Prathvipal");
    expect(document.getElementById("detailRespondentName").textContent).toBe("Banvari & others");
    expect(document.getElementById("detailAppearingText").textContent).toBe("Counsel for Raj Kumar");
    expect(document.getElementById("detailClientHeroName").textContent).toBe("Raj Kumar");
    expect(document.getElementById("detailSnapshotTableBody").textContent).toContain("Prathvipal");
    expect(document.getElementById("detailSnapshotTableBody").textContent).toContain("Banvari & others");
  });
});
