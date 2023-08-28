import { Card, CardHeader, Grid } from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import pin from '../assets/images/pin.png'
import defaultProfile from '../assets/images/profile-thumb.svg'


const LeadsCard = ({lead, activeTab}) => {

  const navigate = useNavigate();
  
    return (
        <div className="mt-44 d-flex gap-50 flex-wrap">
        { 
        lead ? 
        (
            <>
            <div className={activeTab == 0 ? `card-active leadRequestBackground` : activeTab == 1 ? `card-active leadProvidedBackground` : `card-active leadInactiveBackground`} 
            onClick={() => navigate(`/lead-management-details/${lead?.lead_sequence_id}`)}
            >
              {/* <div className="tag">Active</div> */}
              <p className="tag">{lead?.insurance_type?.title}</p>
              <div className="icon-bg-active-card">
                <img
                  src={lead?.profile_picture ? lead?.profile_picture : defaultProfile}
                  alt={"pin Icon"}
                  width="60px"
                  height="60px"
                />
              </div>
              <div>
                <h1>{lead?.first_name +' '+ lead?.last_name}</h1>
                <p>{lead.lead_created_date && moment(lead.lead_created_date).format('MMMM D YYYY h:mmA')}</p>
                
              </div>
            </div>
            </>
        ) : (
          <div className="d-block m-auto">
            <div className="mainNoRecordFound">
              <img
                src={pin}
                alt="noRecordFound"
                width="579px"
                height="300px"
              />
              <p>
                No <span className="spanPrimary">Record</span> Found
              </p>
            </div>
          </div>
        )}
      </div>
    )
}
export default LeadsCard;