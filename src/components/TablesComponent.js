import React, { useEffect, useState } from "react";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import defaultProfile from '../assets/images/profile-thumb.svg'
import NotFound from "./NotFound";
import CustomPagination from "./CustomPagination";


const TablesComponent = ({ columns, data, upcomingLeads, setPages, totalRecords }) => {

  const [dashboardLeads, setDashboardLeads] = useState();
  const [leads, setLeads] = useState();

  console.log("upcomingLeads dashboard : ", upcomingLeads);
  const navigate = useNavigate();


  useEffect(() => {

    if (data?.length > 0) {
      const rowData = data.map(item => {
        return {
          Profile: item.profile_picture ? <img src={item.profile_picture} alt="Profile" width="30px" height="30px" /> : <img src={defaultProfile} alt="Profile" width="30px" height="30px" />,
          Name: item.first_name + item.last_name,
          CreatedAt: item.lead_created_date && moment(item.lead_created_date).format('MMMM D YYYY h:mmA'),
          insuranceType: item.insurance_type.title,
          action: <Visibility onClick={() => navigate(`/lead-management-details/${item?.lead_sequence_id}`)} className="editIcon" />
        };
      });
      setLeads(rowData)
    }
    else if (upcomingLeads?.length > 0) {
      const upcomingLeadsData = upcomingLeads?.map(item => {
        return {
          Username: item.first_name + " " + item.last_name,
          insuranceType: item.insurance_type.title,
          CreatedAt: item.lead_created_date && moment(item.lead_created_date).format('MMMM D YYYY h:mmA'),
          action: <Visibility onClick={() => navigate(`/lead-management-details/${item?.lead_sequence_id}`)} className="editIcon" />
        };
      });
      setDashboardLeads(upcomingLeadsData)
    }
  }, [data, upcomingLeads])


  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        spacing={5}
        mt={5}
      >
        <Grid item md={12}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead className="table-head">
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell key={index}>{column.header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  upcomingLeads || dashboardLeads ?
                    dashboardLeads?.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column.id}>{row[column.id]}</TableCell>
                        ))}
                      </TableRow>
                    ))
                    :
                    leads ?
                      leads?.map((row, index) => (
                        <TableRow key={index}>
                          {columns.map((column) => (
                            <TableCell key={column.id}>{row[column.id]}</TableCell>
                          ))}
                        </TableRow>
                      ))
                      :
                      <TableRow>
                        <TableCell colSpan={columns?.length}>
                          <NotFound />
                        </TableCell>
                      </TableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        {/* <Grid item md={12}> 
        <CustomPagination handler={(page) => setPages(page)} pageCount={Math.ceil(totalRecords / 2)} />
        </Grid> */}
      </Grid>
    </>
  )
}

export default TablesComponent;