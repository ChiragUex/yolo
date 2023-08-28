import { Grid, Typography } from "@mui/material"

const Terms = () => {
    return (
        <>
            <div className="layout">
                <div className="heroSection">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Grid item md={12}>
                            <h1>Terms of use</h1>
                            <Typography>
                            Welcome to our insurance agency! Before you use our services, please carefully read and understand the following Terms of Use. By using our services, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.

Eligibility and Authorization:
You must be of legal age to enter into a binding contract and have the necessary legal capacity to use our services. By using our platform, you represent and warrant that you are eligible and authorized to act as an insurance agent and conduct business on behalf of yourself or the insurance agency you represent.

Compliance with Laws and Regulations:
As an insurance agent, you must comply with all applicable laws, regulations, and ethical standards related to the insurance industry. This includes but is not limited to compliance with licensing requirements, data protection regulations, anti-money laundering laws, and fair practices in marketing and customer service.

Professional Conduct:
You agree to act professionally and ethically while using our platform and providing insurance services. You must not engage in any fraudulent, deceptive, or unethical practices. Respectful communication and transparency with clients are essential in maintaining a positive reputation.

Accuracy of Information:
You are responsible for the accuracy and completeness of the information you provide to clients or customers. Any quotes, policy details, terms, or other insurance-related information must be accurate and up-to-date.

Privacy and Data Protection:
As an insurance agent, you may handle sensitive and personal information of clients or customers. You agree to handle such information in compliance with applicable data protection laws and regulations. Furthermore, you will not share or disclose any confidential client information without explicit consent, unless required by law.

Intellectual Property:
All content and materials provided on our platform, including but not limited to logos, trademarks, text, graphics, and software, are the property of the insurance agency or its licensors. You may not use, reproduce, modify, or distribute any of our intellectual property without prior written permission.

Limitation of Liability:
You agree that the insurance agency and its representatives shall not be liable for any damages, losses, or liabilities arising out of your use of our services. This includes any errors or omissions in the information provided, actions taken based on the information provided, or any disruptions to the services.

Termination:
The insurance agency reserves the right to terminate your access to our platform and services at any time for any reason, without prior notice. You may also terminate your relationship with us by notifying us in writing. Upon termination, any obligations and liabilities that by their nature should survive termination will continue to be in effect.

Changes to the Terms:
We may update or modify these Terms of Use from time to time. It is your responsibility to review these terms periodically, and continued use of our services after any modifications shall constitute your consent to the updated terms.

Governing Law:
These Terms of Use shall be governed by and construed in accordance with the laws of [jurisdiction]. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in [jurisdiction].

If you have any questions or concerns regarding these Terms of Use, please contact us at [contact email/phone]. Thank you for choosing our insurance agency, and we look forward to working with you!
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Terms;