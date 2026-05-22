import { useMemo, useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import './ContactUsScreen.css'

const CONTACT_ROWS = [
  { sNo: '1', state: 'ANDAMAN & NICOBAR', nodalName: 'Sh. Jitendra Kumar Meena, IPS', nodalRank: 'SSP (CID)', nodalEmail: 'spcid.and@nic.in', grievanceName: 'Smt. Sindhu Pillai A, IPS', grievanceRank: 'DIGP (Intl.)', contact: '03192-232334', grievanceEmail: 'igp.and@nic.in' },
  { sNo: '2', state: 'ANDHRA PRADESH', nodalName: 'Sh. Adhiraj Singh Rana IPS.', nodalRank: 'S.P Cyber Crimes, CID', nodalEmail: 'cybercrimes1930@cid.appolice.gov.in', grievanceName: 'SP Cyber Crimes, CID', grievanceRank: 'Superintendent of Police', contact: '0863-2340559', grievanceEmail: 'cybercrimes-cid@ap.gov.in' },
  { sNo: '3', state: 'ARUNACHAL PRADESH', nodalName: 'Sh Shivendu Bhushan IPS', nodalRank: 'SP', nodalEmail: 'spsit@arunpol.nic.in', grievanceName: 'Sh. Take Ringu, IPS', grievanceRank: 'IGP (Crime)', contact: '9436040703', grievanceEmail: 'takeringu@ips.gov.in' },
  { sNo: '4', state: 'ASSAM', nodalName: 'Sh. Saurav Jyoti Saikia APS', nodalRank: 'SP Cyber Crime-2, CID', nodalEmail: 'sp-cid-cyber2@assampolice.gov.in', grievanceName: 'Sh. Debaraj Upadhaya, IPS', grievanceRank: 'IGP, CID', contact: '0361-2521618', grievanceEmail: 'igp-cid@assampolice.gov.in' },
  { sNo: '5', state: 'BIHAR', nodalName: 'Shri. Sushil Kumar IPS', nodalRank: 'SP', nodalEmail: 'cybercell-bih@nic.in', grievanceName: 'Shri. Rajesh Tripathi', grievanceRank: 'SSP', contact: '0612-2238098', grievanceEmail: 'cybercell-bih@nic.in' },
  { sNo: '6', state: 'CHANDIGARH', nodalName: 'Ms. Geetanjali', nodalRank: 'SP, Cyber Crime', nodalEmail: 'spops-chd@nic.in', grievanceName: 'Sh. Raj Kumar Singh, IPS', grievanceRank: 'IGP-UT', contact: '0172-2700056', grievanceEmail: 'dig-chd@nic.in' },
  { sNo: '7', state: 'CHHATTISGARH', nodalName: 'Sh. Kavi Gupta', nodalRank: 'AIG', nodalEmail: 'aigtech-phq.cg@gov.in', grievanceName: 'Shri Girija Shankar Jaiswal', grievanceRank: 'DIG (Technical Services)', contact: '0771-2511989', grievanceEmail: 'girijashankar.ips.@gov.in' },
  { sNo: '8', state: 'DADRA & NAGAR HAVELI AND DAMAN & DIU', nodalName: 'Sh. Ketan Bansal IPS', nodalRank: 'SP', nodalEmail: 'sp-dmn-dd@nic.in', grievanceName: 'Sh. Vikramjit Singh, IPS', grievanceRank: 'DIGP', contact: '0260-2220140', grievanceEmail: 'digp-daman-dd@nic.in' },
  { sNo: '9', state: 'DELHI', nodalName: 'Sh. Vinit Kumar, IPS', nodalRank: 'DCP/IFSO', nodalEmail: 'dcp-ifso@delhipolice.gov.in', grievanceName: 'Sh. Rajneesh Gupta IPS', grievanceRank: 'JT.CP, IFSO Special Cell', contact: '011-20892633', grievanceEmail: 'jointcp.ifsosplcell@delhipolice.gov.in' },
  { sNo: '10', state: 'GOA', nodalName: 'Shri Rajendra Raut Dessai', nodalRank: 'SP, Cyber Crime', nodalEmail: 'spcyber@goapolice.gov.in', grievanceName: 'Sh. Paramaditya', grievanceRank: 'DIGP', contact: '0832-2420883', grievanceEmail: 'digpgoa@goapolice.gov.in' },
  { sNo: '11', state: 'GUJARAT', nodalName: 'Shri. Vivek Bheda', nodalRank: 'Superintendent of Police', nodalEmail: 'cc-cid@gujarat.gov.in', grievanceName: 'Sh. S.G. Trivedi', grievanceRank: 'IGP', contact: '079-23250798', grievanceEmail: 'cc-cid@gujarat.gov.in' },
  { sNo: '12', state: 'HARYANA', nodalName: 'Sh. Sibash Kabiraj IPS, ADGP Cyber Haryana', nodalRank: 'ADGP', nodalEmail: 'sp-cybercrimephq.pol@hry.gov.in', grievanceName: 'Sh. Mayank Gupta', grievanceRank: 'SP', contact: '0172-2524058', grievanceEmail: 'sp-cybercrimephq.pol@hry.gov.in' },
  { sNo: '13', state: 'HIMACHAL PRADESH', nodalName: 'IPS Mohit Chawla', nodalRank: 'DIG', nodalEmail: 'dig-cybercr-hp@nic.in', grievanceName: 'Sh. D. K. Chaudhary', grievanceRank: 'DIGP/Crime', contact: '0177-2620331', grievanceEmail: 'adgp-cid-hp@nic.in' },
  { sNo: '14', state: 'JAMMU & KASHMIR', nodalName: 'Sh. Ramnesh Gupta JEPS', nodalRank: 'SSP CICE J&K', nodalEmail: 'ssp-cicejk@jkpolice.gov.in', grievanceName: 'Sh. RR Swan', grievanceRank: 'DGP', contact: '0191-25822926', grievanceEmail: 'adgpcidjk@jkpolice.gov.in' },
  { sNo: '15', state: 'JHARKHAND', nodalName: 'Sh. Ehtesham Waquarib IPS, SP, CID', nodalRank: 'SP, CID', nodalEmail: 'sp-cid@jhpolice.gov.in', grievanceName: '-', grievanceRank: 'S.P. Cyber Crime, CID', contact: '0651-2220060', grievanceEmail: 'cyberps@jhpolice.gov.in' },
  { sNo: '16', state: 'KARNATAKA', nodalName: 'Sh. S Ravi', nodalRank: 'ADGP/Intl.', nodalEmail: 'spctrcid@ksp.gov.in', grievanceName: 'Sri Shantanu Sinha, IPS', grievanceRank: 'DIG, Cyber Crimes, Narcotic, CID', contact: '080-22942475', grievanceEmail: 'spctrcid@ksp.gov.in' },
  { sNo: '17', state: 'KERALA', nodalName: 'Sh. Ankit Ashokan IPS', nodalRank: 'SP Cyber Crime', nodalEmail: 'spcyberops.pol@kerala.gov.in', grievanceName: 'Sh H Venkatesh, IPS', grievanceRank: 'ADGP', contact: '0471-2300042', grievanceEmail: 'adgpcyberops.pol@kerala.gov.in' },
  { sNo: '18', state: 'LADAKH', nodalName: 'Sh. Altaf Ahmad Shah IPS, SSP', nodalRank: 'SSP', nodalEmail: 'soto-igp@police.ladakh.gov.in', grievanceName: 'Sh. Deepak Digra- JKPS', grievanceRank: 'SP (AIG CIV PHQ UT Ladakh)', contact: '9541902324', grievanceEmail: 'aig-civl@police.ladakh.gov.in' },
  { sNo: '19', state: 'LAKSHADWEEP', nodalName: 'Sh. Utkarsha IPS', nodalRank: 'SP Cyber Crime', nodalEmail: 'lak-sop@nic.in', grievanceName: 'Sh.Hareshwar V Swami, IPS', grievanceRank: 'SP (L&O)', contact: '04896262258', grievanceEmail: 'lak-sop@nic.in' },
  { sNo: '20', state: 'MADHYA PRADESH', nodalName: 'Sh. Shiyas A', nodalRank: 'IG Cyber', nodalEmail: 'dig2-cybercell@mppolice.gov.in', grievanceName: 'Shri Shiyas A', grievanceRank: 'DIG Cyber', contact: '-', grievanceEmail: 'dig2-cybercell@mppolice.gov.in' },
  { sNo: '21', state: 'MAHARASHTRA', nodalName: 'Sh. Sanjay Shintre', nodalRank: 'DIG Cyber Crime Maharashtra', nodalEmail: 'dig.cbr-mah@gov.in', grievanceName: 'Sh. Sanjay Vilas Shintre', grievanceRank: 'SP', contact: '022-22160080', grievanceEmail: 'sp.cbr-mah@gov.in' },
  { sNo: '22', state: 'MANIPUR', nodalName: 'Shri N. John', nodalRank: 'Superintendent of Police', nodalEmail: 'sp-cybercrime.mn@manipur.gov.in', grievanceName: 'Sh. Ningshem Worngam', grievanceRank: 'DIGP (Int)', contact: '0385-2444888', grievanceEmail: 'grievance.ncrp@gmail.com' },
  { sNo: '23', state: 'MEGHALAYA', nodalName: 'Sh. Dheeraj Yadav IPS', nodalRank: 'SSP', nodalEmail: 'cid-meg@gov.in', grievanceName: 'Shri Dheeraj Yadav, IPS', grievanceRank: 'SP (Cyber)', contact: '9402519391', grievanceEmail: 'ccw-meg@gov.in' },
  { sNo: '24', state: 'MIZORAM', nodalName: 'Sh. Zonun Sanga MPS', nodalRank: 'SP', nodalEmail: 'cybercrime.sp@mizoram.gov.in', grievanceName: 'Sh Devesh Chandra Srivastava, IPS', grievanceRank: 'DGP', contact: '0389-2334682', grievanceEmail: 'polmizo@rediffmail.com' },
  { sNo: '25', state: 'NAGALAND', nodalName: 'Sh. Vikram M Khalate IPS, IGP CID', nodalRank: 'IGP', nodalEmail: 'spcyber-ngl@gov.in', grievanceName: 'Sh. Sandeep M. Tamgadge, IPS', grievanceRank: 'ADGP (L&O)', contact: '6009308003', grievanceEmail: 'adgplo.ngl@gov.in' },
  { sNo: '26', state: 'ODISHA', nodalName: 'Shri. Shefeen Ahamed K, IPS', nodalRank: 'IGP, CID CB', nodalEmail: 'igp2-cidcb@odishapolice.gov.in', grievanceName: 'Sh. Arun Bothra, IPS', grievanceRank: 'ADGP', contact: '0674-2913100', grievanceEmail: 'adgcidcb.orpol@nic.in' },
  { sNo: '27', state: 'PUDUCHERRY', nodalName: 'Ms. Shruti Yaragatti IPS', nodalRank: 'SP Cyber Crime', nodalEmail: 'cybercell-police.py@gov.in', grievanceName: 'Sh. Dr. VJ Chandran', grievanceRank: 'IGP', contact: '0413-2231313', grievanceEmail: 'igp@py.gov.in' },
  { sNo: '28', state: 'PUNJAB', nodalName: 'Jashandeep Singh Gill', nodalRank: 'Superintendent of Police', nodalEmail: 'aigcc@punjabpolice.gov.in', grievanceName: 'Sh. P. K. Sinha, IPS', grievanceRank: 'ADGP, Cyber Crime', contact: '0172-2226258', grievanceEmail: 'igp.cyber.c.police@punjabpolice.gov.in' },
  { sNo: '29', state: 'RAJASTHAN', nodalName: 'Shri Shantanu Kumar Singh', nodalRank: 'Superintendent of Police', nodalEmail: 'sp.cybercrime@rajpolice.gov.in', grievanceName: 'Shri Sharat Kaviraj', grievanceRank: 'Inspector General of Police', contact: '01412821741', grievanceEmail: 'sp.cybercrime@rajpolice.gov.in' },
  { sNo: '30', state: 'SIKKIM', nodalName: 'Sh. Tenzing Loden Lepcha', nodalRank: 'IPS, DIGP CB-CID', nodalEmail: 'spcid@sikkimpolice.nic.in', grievanceName: 'Sh. Abhishek Dahal', grievanceRank: 'Police Inspector/CID', contact: '8695622134', grievanceEmail: 'cybercrime666sk@gmail.com' },
  { sNo: '31', state: 'TAMIL NADU', nodalName: 'Ms. Shahnaz Illiyas', nodalRank: 'Superintendent of Police Cyber', nodalEmail: 'sp1-ccdtnpolice@gov.in', grievanceName: 'Sh. D. Ashok Kumar', grievanceRank: 'SP (for OTHER CYBER CRIMES)', contact: '044-29580300', grievanceEmail: 'sp1-ccdtnpolice@gov.in' },
  { sNo: '32', state: 'TELANGANA', nodalName: 'Ms. B. Sai Sri', nodalRank: 'SP TGCSB', nodalEmail: 'spoperations-csb-ts@tspolice.gov.in', grievanceName: 'Smt. Shikha Goel, IPS', grievanceRank: 'Director, TSCSB', contact: '040-29320049', grievanceEmail: 'director-tscsb@tspolice.gov.in' },
  { sNo: '33', state: 'TRIPURA', nodalName: 'Sh. Nabadwip Jamatia TPS', nodalRank: 'SP', nodalEmail: 'spcybercrime@tripurapolice.nic.in', grievanceName: 'Smt. Sudeshna Bhattacharyya, TPS', grievanceRank: 'SP (SCRB)', contact: '0381-2376979', grievanceEmail: 'spscrb@tripurapolice.nic.in' },
  { sNo: '34', state: 'UTTARAKHAND', nodalName: 'Sh. Nilesh Anand Bharne', nodalRank: 'IG Cyber Crime/STF', nodalEmail: 'nileshanad.bharne@ips.gov.in', grievanceName: 'Sh. Ayush Agarwal', grievanceRank: 'SSP/STF', contact: '0135-2655900', grievanceEmail: 'spstf-uk@nic.in' },
  { sNo: '35', state: 'UTTAR PRADESH', nodalName: 'Sh. Rajesh Kumar', nodalRank: 'SP, Cyber Crime', nodalEmail: 'sp-cyber.lu@up.gov.in', grievanceName: 'Binod Kumar Singh', grievanceRank: 'ADG', contact: '0522-2390538', grievanceEmail: 'adg-cybercrime.lu@up.gov.in' },
  { sNo: '36', state: 'WEST BENGAL', nodalName: 'Sh. Suresh Kumar Chadive', nodalRank: 'IPS, DIG Cyber Crime', nodalEmail: 'dig1-ccw@policewb.gov.in', grievanceName: 'Shri Sanjay Singh, IPS', grievanceRank: 'DG & IGP, Cyber Crime Wing', contact: '033-22021200', grievanceEmail: 'ncrp-ccw@policewb.gov.in' },
]

const LOCAL_CONTACT_ROWS = [
  {
    sNo: '1',
    name: 'Shubham Chandravanshi',
    designation: 'National President',
    address: 'Bilari, Moradabad, Uttar Pradesh',
    email: 'shubhamchandravanshi23@gmail.com',
    contactNumber: '9411413410',
  },
  {
    sNo: '2',
    name: 'Rinku Chaudhary',
    designation: 'National Vice President',
    address: 'Bilari, Moradabad, Uttar Pradesh',
    email: 'rinkuchaudhary@gmail.com',
    contactNumber: '7983697306',
  },
  {
    sNo: '3',
    name: 'Mohit Kumar',
    designation: 'National General Secretary',
    address: 'Bilari, Moradabad, Uttar Pradesh',
    email: 'mohitkumar@gmail.com',
    contactNumber: '8449826613',
  },
  // {
  //   sNo: '4',
  //   name: 'Sneha Kulkarni',
  //   designation: 'Citizen Support Executive',
  //   address: 'Vijayanagar, Bengaluru, Karnataka',
  //   email: 'sneha.kulkarni@cybersafe.org',
  //   contactNumber: '9900212345',
  // },
]

function ContactUsScreen() {
  const [localSearchInput, setLocalSearchInput] = useState('')
  const [localSearchTerm, setLocalSearchTerm] = useState('')
  const [stateSearch, setStateSearch] = useState('')
  const [nodalSearch, setNodalSearch] = useState('')
  const [grievanceSearch, setGrievanceSearch] = useState('')

  const filteredLocalRows = useMemo(() => {
    const term = localSearchTerm.trim().toLowerCase()

    return LOCAL_CONTACT_ROWS.filter((row) => {
      if (!term) {
        return true
      }

      return (
        row.name.toLowerCase().includes(term)
        || row.designation.toLowerCase().includes(term)
        || row.address.toLowerCase().includes(term)
        || row.email.toLowerCase().includes(term)
        || row.contactNumber.toLowerCase().includes(term)
      )
    })
  }, [localSearchTerm])

  const filteredRows = useMemo(() => {
    const stateTerm = stateSearch.trim().toLowerCase()
    const nodalTerm = nodalSearch.trim().toLowerCase()
    const grievanceTerm = grievanceSearch.trim().toLowerCase()

    return CONTACT_ROWS.filter((row) => {
      const stateMatch = !stateTerm || row.state.toLowerCase().includes(stateTerm)
      const nodalMatch = !nodalTerm || row.nodalName.toLowerCase().includes(nodalTerm)
      const grievanceMatch = !grievanceTerm || row.grievanceName.toLowerCase().includes(grievanceTerm)
      return stateMatch && nodalMatch && grievanceMatch
    })
  }, [stateSearch, nodalSearch, grievanceSearch])

  const runLocalSearch = () => {
    setLocalSearchTerm(localSearchInput)
  }

  const handleLocalSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      runLocalSearch()
    }
  }

  const sanitizePdfText = (value) => String(value)
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const downloadLocalPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' })

    doc.setFontSize(14)
    doc.text('Contact Us - Support Contacts', 40, 40)
    doc.setFontSize(10)
    doc.text('Report Generated by: Cyber Crime Suraksha Sangh Portal', 40, 60)
    doc.text(`Generated Date: ${new Date().toLocaleDateString('en-IN')}`, 40, 76)

    autoTable(doc, {
      head: [['S No.', 'Name', 'Designation', 'Address', 'Email', 'Contact Number']],
      body: filteredLocalRows.map((row) => [
        sanitizePdfText(row.sNo),
        sanitizePdfText(row.name),
        sanitizePdfText(row.designation),
        sanitizePdfText(row.address),
        sanitizePdfText(row.email),
        sanitizePdfText(row.contactNumber),
      ]),
      startY: 92,
      styles: {
        fontSize: 8,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [33, 84, 191],
      },
      alternateRowStyles: {
        fillColor: [245, 248, 255],
      },
      margin: { left: 24, right: 24 },
      theme: 'grid',
    })

    doc.save('contact-details-ccss.pdf')
  }

  const downloadPdf = () => {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })

    doc.setFontSize(14)
    doc.text('Contact Us', 40, 40)
    doc.setFontSize(10)
    doc.text('Report Generated by: Cyber Crime Suraksha Sangh Portal', 40, 60)
    doc.text(`Generated Date: ${new Date().toLocaleDateString('en-IN')}`, 40, 76)

    autoTable(doc, {
      head: [[
        'S No.',
        "State/UT's",
        'Nodal Name',
        'Nodal Rank',
        'Nodal Email',
        'Grievance Name',
        'Grievance Rank',
        'Contact',
        'Grievance Email',
      ]],
      body: filteredRows.map((row) => [
        row.sNo,
        row.state,
        row.nodalName,
        row.nodalRank,
        row.nodalEmail,
        row.grievanceName,
        row.grievanceRank,
        row.contact,
        row.grievanceEmail,
      ]),
      startY: 92,
      styles: {
        fontSize: 7,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [33, 84, 191],
      },
      alternateRowStyles: {
        fillColor: [245, 248, 255],
      },
      margin: { left: 24, right: 24 },
      theme: 'grid',
    })

    doc.save('contact-us-ccss.pdf')
  }

  return (
    <section id="contact-us-page" className="contact-us-wrap">
      <div className="contact-us-container">
        <div className="contact-helpline-strip">
          REPORT ONLINE FINANCIAL FRAUD AT THE NATIONAL CYBERCRIME HELPLINE NUMBER 1930.
        </div>

        <h2>Contact Directory</h2>

        <div className="contact-filter-row contact-filter-row-local">
          <input
            type="text"
            value={localSearchInput}
            onChange={(event) => setLocalSearchInput(event.target.value)}
            onKeyDown={handleLocalSearchKeyDown}
            placeholder="Search by name, designation, address, email or contact number"
          />
          <button type="button" className="contact-search-btn" onClick={runLocalSearch}>Search</button>
          <button type="button" className="contact-download-btn" onClick={downloadLocalPdf}>
            Download PDF
          </button>
        </div>

        <div className="contact-table-wrap">
          <table className="contact-table contact-table-local">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Address</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredLocalRows.length ? (
                filteredLocalRows.map((row) => (
                  <tr key={row.sNo}>
                    <td>{row.sNo}</td>
                    <td>{row.name}</td>
                    <td>{row.designation}</td>
                    <td>{row.address}</td>
                    <td>{row.email}</td>
                    <td>{row.contactNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="contact-empty-row">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2>State/UT Nodal Officer and Grievance Officer contact details</h2>

        <p className="contact-note">
          <strong>Note:</strong> Complainant who registered complaint using "Report & Track" option on
          the National Cyber Crime Reporting Portal may contact the respective State/UT Nodal Officer
          or Grievance Officer if the response has not been appropriate.
        </p>

        <div className="contact-filter-row">
          <input
            type="text"
            value={stateSearch}
            onChange={(event) => setStateSearch(event.target.value)}
            placeholder="State Name"
          />
          <input
            type="text"
            value={nodalSearch}
            onChange={(event) => setNodalSearch(event.target.value)}
            placeholder="Nodal Officer Name"
          />
          <input
            type="text"
            value={grievanceSearch}
            onChange={(event) => setGrievanceSearch(event.target.value)}
            placeholder="Grievance Officer Name"
          />
          <button type="button" className="contact-search-btn">Search</button>
          <button type="button" className="contact-download-btn" onClick={downloadPdf}>
            Download PDF
          </button>
        </div>

        <div className="contact-table-wrap">
          <table className="contact-table">
            <thead>
              <tr>
                <th colSpan={9} className="contact-email-format-note">
                  Note: In the Email Column, [at] indicates @ &nbsp;&nbsp; [dot] indicates .
                  &nbsp;&nbsp; [hyphen] indicates -
                </th>
              </tr>
              <tr>
                <th>S.No</th>
                <th>State/UT's</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Email</th>
                <th>Name</th>
                <th>Rank</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
              <tr>
                <th colSpan={2}></th>
                <th colSpan={3} className="contact-group-head contact-group-head-nodal">Nodal Cyber cell Officer</th>
                <th colSpan={4} className="contact-group-head contact-group-head-grievance">Grievance Officer Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length ? (
                filteredRows.map((row) => (
                  <tr key={row.sNo}>
                    <td>{row.sNo}</td>
                    <td>{row.state}</td>
                    <td>{row.nodalName}</td>
                    <td>{row.nodalRank}</td>
                    <td>{row.nodalEmail}</td>
                    <td>{row.grievanceName}</td>
                    <td>{row.grievanceRank}</td>
                    <td>{row.contact}</td>
                    <td>{row.grievanceEmail}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="contact-empty-row">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default ContactUsScreen
