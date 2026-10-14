import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../utils/dateUtils.js';
import '../admin.js';
import '../components/print/print-templates.js';

describe('components/print/print-templates.js - DOM Mounting & Structure', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('ensurePrintTemplatesMounted should auto-create container and mount print templates', () => {
    expect(window.ensurePrintTemplatesMounted).toBeDefined();
    const dossierEl = window.ensurePrintTemplatesMounted();
    expect(dossierEl).not.toBeNull();
    expect(dossierEl.id).toBe('printableCaseDossier');

    const causeListEl = document.getElementById('printableCauseList');
    expect(causeListEl).not.toBeNull();
  });
});

describe('components/print/print-templates.js - populatePrintableCaseDossier for Different Case Types', () => {
  beforeEach(() => {
    window.ensurePrintTemplatesMounted();
  });

  it('populates Civil suit details accurately', () => {
    const civilCase = {
      caseNo: 'CS/55/2025',
      caseYear: '2025',
      caseType: 'civil',
      courtName: 'Civil Judge Senior Division',
      plaintiff: 'Rameshwar',
      defendant: 'Someshwar',
      filingDate: '2025-01-15',
      nextHearing: '2026-11-20',
      hearingProcess: 'Evidence',
      previousHearing: '2026-08-10',
      previousProcess: 'Framing of Issues',
      clientName: 'Rameshwar Dayal',
      clientNumber: '9988776655',
      remarks: 'Injunction application pending disposal.'
    };

    window.populatePrintableCaseDossier(civilCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('CIVIL CASE');
    expect(document.getElementById('casePrintNo').textContent).toBe('CS/55/2025');
    expect(document.getElementById('casePrintTitle').textContent).toBe('Rameshwar vs Someshwar');
    expect(document.getElementById('casePrintCourt').textContent).toBe('Civil Judge Senior Division');
    expect(document.getElementById('casePrintClientName').textContent).toBe('Rameshwar Dayal');
    expect(document.getElementById('casePrintClientPhone').textContent).toBe('9988776655');
    expect(document.getElementById('casePrintRemarks').textContent).toContain('Injunction application');
  });

  it('populates Criminal case particulars including FIR and IPC sections', () => {
    const criminalCase = {
      criminalCaseNumber: 'ST/108/2026',
      crimeYear: '2026',
      caseType: 'criminal',
      criminalCourtName: 'Additional Sessions Court',
      victimName: 'State',
      accusedName: 'Kuldeep Singh',
      policeStation: 'Kotwali Nagar',
      crimeNumber: '420',
      crimeSection: '302, 120B IPC',
      custodyStatus: 'In Judicial Custody',
      clientName: 'Smt. Kamla Devi',
      clientNumber: '9876501234'
    };

    window.populatePrintableCaseDossier(criminalCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('CRIMINAL CASE');
    expect(document.getElementById('casePrintNo').textContent).toBe('ST/108/2026');
    expect(document.getElementById('casePrintTitle').textContent).toBe('State vs Kuldeep Singh');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('Kotwali Nagar');
    expect(partiesContent).toContain('302, 120B IPC');
    expect(partiesContent).toContain('In Judicial Custody');
  });

  it('populates Family dispute particulars including marriage date and maintenance', () => {
    const familyCase = {
      caseNo: 'MAT/12/2025',
      caseType: 'family',
      courtName: 'Principal Judge Family Court',
      petitioner: 'Priya Sharma',
      respondent: 'Amit Sharma',
      marriageDate: '2020-02-14',
      maintenance: '₹15,000 / Month claimed under Sec 125 CrPC',
      clientName: 'Priya Sharma'
    };

    window.populatePrintableCaseDossier(familyCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('FAMILY CASE');
    expect(document.getElementById('casePrintTitle').textContent).toBe('Priya Sharma vs Amit Sharma');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('14/02/2020');
    expect(partiesContent).toContain('15,000');
  });

  it('populates Revenue matter particulars including village and Khata/Gata numbers', () => {
    const revenueCase = {
      caseNo: 'REV/77/2026',
      caseType: 'revenue',
      courtName: 'SDM Court',
      applicant: 'Balram',
      respondent: 'Gram Sabha',
      village: 'Behta',
      khataNo: '142',
      gataNo: '588',
      clientName: 'Balram Yadav'
    };

    window.populatePrintableCaseDossier(revenueCase);

    expect(document.getElementById('casePrintTypeBadge').textContent).toBe('REVENUE CASE');

    const partiesContent = document.getElementById('casePrintPartiesContent').innerHTML;
    expect(partiesContent).toContain('Behta');
    expect(partiesContent).toContain('Khata: 142');
    expect(partiesContent).toContain('Gata: 588');
  });

  it('handles disposed case status and disposal comment properly', () => {
    const disposedCase = {
      caseNo: 'CS/01/2020',
      caseType: 'civil',
      status: 'disposed',
      disposalComment: 'Suit decreed with costs in favor of plaintiff.'
    };

    window.populatePrintableCaseDossier(disposedCase);

    expect(document.getElementById('casePrintStatus').textContent).toBe('Disposed Off');
    const dispRow = document.getElementById('casePrintDisposalRow');
    expect(dispRow.style.display).not.toBe('none');
    expect(document.getElementById('casePrintDisposalComment').textContent).toContain('decreed with costs');
  });
});

describe('components/print/print-templates.js - printCurrentCaseDossier Execution', () => {
  beforeEach(() => {
    window.ensurePrintTemplatesMounted();
  });

  it('printCurrentCaseDossier adds printing class and invokes window.print()', () => {
    const printMock = vi.fn();
    window.print = printMock;

    const caseObj = {
      caseNo: 'CS/88/2026',
      caseName: 'Test Print Matter',
      caseType: 'civil'
    };

    window.printCurrentCaseDossier(caseObj);

    expect(printMock).toHaveBeenCalled();
    expect(document.body.classList.contains('printing-case-dossier')).toBe(true);
  });

  it('alerts when printCurrentCaseDossier is called with no case', () => {
    const alertMock = vi.fn();
    window.alert = alertMock;
    window.currentSelectedCase = null;

    window.printCurrentCaseDossier(null);

    expect(alertMock).toHaveBeenCalledWith('Please select a case to print.');
  });
});
