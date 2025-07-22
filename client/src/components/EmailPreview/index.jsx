import { Typography, IconButton, DialogContent, Grid, Chip, Avatar, TextField, Box, DialogActions } from "@mui/material"
import AnimatedIcon from "components/AnimatedIcons/AnimatedIcons";
import { Formik, Form, Field } from 'formik';
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";

export const EmailPreview = (fromEmails, toEmails, ccEmails, bccEmails, emailSubject, emailDescription, handleClose) => {

    const style = {
        position: 'absolute',
        top: '10%',
        bottom: '10%',
        left: '5%',
        right: '5%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 3,
        display: 'flex',
        flexDirection: "column",
    };

    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center', mb: 2, fontWeight: "800", }}>
                SEND TO AUTHOR
            </Typography>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <AnimatedIcon
                    iconId="zxvuvcnc"
                    size={30}
                    colors="black"
                    isHovered={true}
                />
            </IconButton>
            <Box sx={{
                flex: 1,
                padding: '16px',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#555',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '4px',
                },
                scrollbarWidth: 'thin',
                '&': {
                    overflowY: 'auto',
                },
            }}>


                <Formik >
                    {({ setFieldValue, errors, touched, values, validateForm, setTouched, handleSubmit, setValues }) => {
                        return (<>
                            <Form>
                                <DialogContent dividers>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <label style={{ fontWeight: 'bold' }}>From :</label> 
                                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                                                {fromEmails?.length > 0 ? (
                                                    fromEmails?.map((email) => (
                                                        <Chip
                                                            avatar={
                                                                <Avatar style={{ backgroundColor: getColorFromEmail(email), color: '#FFFFFF' }}>
                                                                    {email?.charAt(0)?.toUpperCase()}
                                                                </Avatar>
                                                            }
                                                            key={email}
                                                            label={email}
                                                            // onDelete={() => handleEmailDelete(setFromEmails, email)}
                                                            style={{ margin: '4px' }}
                                                        />
                                                    ))
                                                ) : (
                                                    <span>No emails added</span>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label style={{ fontWeight: 'bold' }}>To :</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                                                {toEmails?.length > 0 ? (
                                                    toEmails?.map((email) => (
                                                        <Chip
                                                            avatar={
                                                                <Avatar style={{ backgroundColor: getColorFromEmail(email), color: '#FFFFFF' }}>
                                                                    {email?.charAt(0)?.toUpperCase()}
                                                                </Avatar>
                                                            }
                                                            key={email}
                                                            label={email}
                                                            style={{ margin: '4px' }}
                                                        />
                                                    ))
                                                ) : (
                                                    <span>No emails added</span>
                                                )}
                                            </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <label style={{ fontWeight: 'bold' }}>CC :</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>

                                                {ccEmails?.length > 0 ? (
                                                    ccEmails?.map((email) => (
                                                        <Chip
                                                            avatar={
                                                                <Avatar style={{ backgroundColor: getColorFromEmail(email), color: '#FFFFFF' }}>
                                                                    {email?.charAt(0)?.toUpperCase()}
                                                                </Avatar>
                                                            }
                                                            key={email}
                                                            label={email}
                                                            style={{ margin: '4px' }}
                                                        />
                                                    ))
                                                ) : (
                                                    <span>No emails added</span>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label style={{ fontWeight: 'bold' }}>BCC :</label>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                                                {bccEmails?.length > 0 ? (
                                                    bccEmails?.map((email) => (
                                                        <Chip
                                                            avatar={
                                                                <Avatar style={{ backgroundColor: getColorFromEmail(email), color: '#FFFFFF' }}>
                                                                    {email?.charAt(0)?.toUpperCase()}
                                                                </Avatar>
                                                            }
                                                            key={email}
                                                            label={email}
                                                            style={{ margin: '4px' }}
                                                        />
                                                    ))
                                                ) : (
                                                    <span>No emails added</span>
                                                )}
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Field name="subject">
                                                {({ field, meta }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Subject"
                                                        fullWidth
                                                        variant="standard"
                                                        required
                                                        value={emailSubject}
                                                        error={Boolean(meta.touched && meta.error)}
                                                        helperText={meta.touched && meta.error}
                                                        disabled
                                                    />
                                                )}
                                            </Field>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div>
                                                {emailDescription ? <ReactQuill
                                                    style={{ opacity: '0.6' }}
                                                    id="emailDescription"
                                                    readOnly={true}
                                                    value={emailDescription}
                                                    placeholder='please enter text'
                                                    modules={{
                                                        toolbar: false
                                                    }}
                                                /> : <ReactQuill
                                                    style={{ opacity: '0.6' }}
                                                    id="emailDescription"
                                                    readOnly={true}
                                                    value="No description"
                                                    placeholder='please enter text'
                                                    modules={{
                                                        toolbar: false
                                                    }}
                                                />}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button>CANCEL</Button>
                                    <Button variant="contained" color="primary" onClick={() => handleSendToAuthor(selectedRow)}>
                                        SEND TO AUTHOR
                                    </Button>
                                </DialogActions>
                            </Form>
                        </>)
                    }}
                </Formik>
            </Box>
        </Box>);
}