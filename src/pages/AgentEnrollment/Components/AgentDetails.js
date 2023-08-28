import InputFieldController from "../../../components/FormControls/InputFieldController";

const AgentDetails = (props) => {

  const { control, emailId } = props;

  return(
    <>
      <div className="agent-enrollment-heading" >
      Agent Details
      </div>
      <div className="d-flex gap-20 flex-wrap">
          <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="name"
            label="Name"
            placeholder="Enter Agent Name"
          />
          </div>
          <div className="customer-information-input">
          <InputFieldController
            control={control}
            fullWidth
            name="email"
            defaultValue={emailId}
            label="Email ID"
            placeholder="Enter Email ID"
            disabled={true}
          />
          </div>
      </div>  
    </>
  )
}
export default AgentDetails;