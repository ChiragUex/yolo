import { ExpandMore } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";

const LeadDetailsAccordion = ({title, children, accordionIndex, expanded, status, editIcon, handleEditIconClick, expandUpdateDetailsAccordion, handleSaveIconClick}) => {
  
  const [triggered,setTriggered] = useState(expanded || false);

  
  
    return (
        <>
        <Accordion className='leadsDetailsAccordion' key={title == "Leads Details" ? accordionIndex : "accordionIndex" + accordionIndex} defaultExpanded={expanded ? expanded : false} expanded={expandUpdateDetailsAccordion ? expandUpdateDetailsAccordion : triggered} onChange={() => setTriggered(!triggered)}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" alignContent="center"  width="100%">
                <div>
                <h3>{title} {status == "rejected" ? <Chip label="Rejected" style={{color:'#fff',backgroundColor:"#f72929",marginLeft:'5px'}} /> : status == "pending" ? <Chip label="Pending" style={{color:'#fff',backgroundColor:"#ffb600",marginLeft:'5px'}} /> : status == "accepted" ? <Chip label="Approved" style={{color:'#fff',backgroundColor:"#00bf00",marginLeft:'5px'}} /> : ""}</h3>
                </div>
                <div>
                  {
                   editIcon == "editProfilePicture" ? <span onClick={(e) => {handleEditIconClick(editIcon);e.stopPropagation();}}><EditIcon style={{fontSize:'30px'}} /></span> :  editIcon == "saveProfilePicture" ? <Button type="submit"><SaveIcon style={{fontSize:'30px'}} onClick={(e) => {handleSaveIconClick(editIcon);e.stopPropagation();}}/></Button> :
                   editIcon == "editPeronalDetails" ? <span onClick={(e) => {handleEditIconClick(editIcon);e.stopPropagation();}}><EditIcon style={{fontSize:'30px'}} /></span> :  editIcon == "savePeronalDetails" ? <Button type="submit"><SaveIcon style={{fontSize:'30px'}} onClick={(e) => {handleSaveIconClick(editIcon);e.stopPropagation();}}/></Button> :
                   editIcon == `editAffiliationDetails${accordionIndex}` ? <span onClick={(e) => {handleEditIconClick(editIcon,accordionIndex);e.stopPropagation();}}><EditIcon style={{fontSize:'30px'}} /></span> :  editIcon == `saveAffiliationDetails${accordionIndex}` ? <Button type="submit"><SaveIcon style={{fontSize:'30px'}} onClick={(e) => {handleSaveIconClick(editIcon,accordionIndex);e.stopPropagation();}}/></Button> :
                   status == "rejected" && editIcon == `editLicenseDetails${accordionIndex}` ? <span onClick={(e) => {handleEditIconClick(editIcon,accordionIndex);e.stopPropagation();}}><EditIcon style={{fontSize:'30px'}} /></span> : status == "rejected" && editIcon == `saveLicenseDetails${accordionIndex}` ? <Button type="submit"><SaveIcon style={{fontSize:'30px'}} onClick={(e) => {handleSaveIconClick(editIcon,accordionIndex);e.stopPropagation();}}/></Button> : ""
                  }
                  {/* {status == "rejected" ? <EditIcon style={{fontSize:'30px'}}/> : <EditIcon style={{fontSize:'30px'}}/>} */}
                </div>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
             {children}
            </AccordionDetails>
            </Accordion>
        </>
    )
}


export default LeadDetailsAccordion;
