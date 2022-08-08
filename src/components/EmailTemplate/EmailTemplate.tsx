import React from "react";

export type EmailTemplateProps = {
    name?: string;
    username?: string;
    imageURL?: string;
    videolink?: string;
    weblink?: string;
    body1?: string;
    body2?: string;
    body3?: string;
};

/**
 * A component for email templates
 * @param props
 * @constructor
 */
export const EmailTemplate = (props: EmailTemplateProps) => {
    return(
        <div>
            <div className="bg-primary-600 h-30 w-8/12 border-y-10 border-transparent mx-auto">
                <img
                    className="max-w-[14rem] max-h-[18rem] object-scale-down mx-auto w-auto h-auto py-2"
                    src={"https://ci4.googleusercontent.com/proxy/wuXgGT6Rjpf1MJlSYli4Q--_2PTK9RPb47-bGkGNtNzTSBOLhUrhnoTkLhoRJe15sSs1YWNfehU_tJUbRDeLQ5Et0UFHLo2ZhBWYN32Y5pp0gjx8zQ79pRjM1Agx9vI9ACYMVEHKQym_EWs8g16JG0zXKLdMig=s0-d-e1-ft#https://mcusercontent.com/adbb329311074b5cd6c7abbcf/images/0929c598-25dd-d1db-fba2-0441d9580f63.png"}
                />
            </div>
            <div className="h-400 w-6/12 mx-auto space-y-3 font-sans text-gray-500 py-8">
                <p className="text-left">Hi {props.name},</p>
                <p className="text-left">{props.body1}</p>
                <p className="text-left">{props.body2}</p>
                <p className="text-left">{props.body3}</p>
                <div>
                    <p><iframe className="aspect-video" src={props.videolink}/></p>
                </div>
            </div>
            <div className="h-400 w-6/12 mx-auto font-sans text-gray-500 pb-8">
                <p className="text-left">Best,</p>
                <p className="text-left">Team Local</p>
            </div>
            <div className="bg-primary-600 h-40 w-8/12 mx-auto">
                <div className="flex justify-center -space-x-4 border-b-1.5 border-brown-600 w-10/12 pt-8 px-4 py-6 m-2 mx-auto">
                    <div>
                        <a href="https://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_track_click-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D22cabb105b-26e-3D4c221502e8&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=vGMeVpEb9J5N55jPl27vWoKSxWBgTfrsNfHGsqYcgis&e=">
                            <img
                            className="w-4/12 h-4/12 mx-auto"
                            src={"https://ci6.googleusercontent.com/proxy/8fgBdZBX3JjUOKraK9u_b8f4DQ_Ny03Yd6Obg5raCE3gtOpiSANJmEYVDKmKs0_6CyfunSpnWw9K3IUUXvdBz0_mE2nCD_KVmCBbHHxAdIZZcx3Jye_DCTr0BKJWMFZU5hxbyOHq=s0-d-e1-ft#https://cdn-images.mailchimp.com/icons/social-block-v2/outline-dark-facebook-48.png"}
                            />
                        </a>
                    </div>
                    <div>
                        <a href="https://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_track_click-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D390576903f-26e-3D4c221502e8&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=sbQuOkytYpcADzqgu_hUj8Httd6yMQi5xtQdUAwzysY&e=">
                            <img
                            className="w-4/12 h-4/12 mx-auto"
                            src={"https://ci3.googleusercontent.com/proxy/KkCqE6Cw12qEVuwvlR8-sliWEiVc51XbZQiQYovt25VZ9_xxz11bfymCILIiCmeLDAIb0R-lIWV0iWCNYUIfLi7AOeTQCz0Lh9QcFAe-_YVqgUowsT9XX_aKIcwHOWWtXf42pBo=s0-d-e1-ft#https://cdn-images.mailchimp.com/icons/social-block-v2/outline-dark-twitter-48.png"}
                            />
                        </a>
                    </div>
                    <div>
                        <a href="https://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_track_click-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D035581aecd-26e-3D4c221502e8&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=hvZ7SqFq8EaJwpHdfDuw-Qulk-1Uj0ZYPej7yUwOK_w&e=">
                            <img
                            className="w-4/12 h-4/12 mx-auto"
                            src={"https://ci4.googleusercontent.com/proxy/c266s7jXMo8amedHTT6-pqIveQYjw7G52DWikhTT1Mw4Of2TAplGr8713DZ8hZ5egd3h1Cz__O5-NrbWxkrjXjAuEZw5XaBsuiBNVq_uJaK3spnELm79yy2dmsHZeqL-JoUqpZ8pUw=s0-d-e1-ft#https://cdn-images.mailchimp.com/icons/social-block-v2/outline-dark-instagram-48.png"}
                            />
                        </a>
                    </div> 
                    <div> 
                        <a href="https://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_track_click-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D5473291509-26e-3D4c221502e8&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=5f5ogYl8tZN_NNlthW7mE1hzmitEWmhvQTki17USl4Q&e=">
                            <img
                            className="w-4/12 h-4/12 mx-auto"
                            src={"https://ci6.googleusercontent.com/proxy/FTJfAGFsxdnboQ-NNi9-uHMMCTddk6MaVtEZ5_FSxwHkhnqHJfXz1xoE0jHnO63DQC1eKVMKwHqoCLXlqlAN3z4FybCDgmKgIc00Hzv-FX0rPFGxPQkKXxz-66BtUFW0E4RAEolW=s0-d-e1-ft#https://cdn-images.mailchimp.com/icons/social-block-v2/outline-dark-linkedin-48.png"}
                            />
                        </a>
                    </div>
                </div>
                <div className="w-8/12 h-3/12 px-4 py-2 text-xxs mx-auto font-sans text-white">
                    <p className="text-center italic">Copyright © 2021 Local Impact Inc., All rights reserved.</p>
                    <p className="text-center text-primary-600"> .</p>
                    <p className="text-center">Want to change how you receive these emails?</p>
                    <p className="text-center">You can <a href="hhttps://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_profile-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D3ff118c070-26e-3D4c221502e8-26c-3D1d48f6db95&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=oQvYmLMdwX7q_C5DLOsy9WsumkjXZsiHjuz7PCvo4sw&e=" className="text-white underline">update your preferences</a> or <a href="https://urldefense.proofpoint.com/v2/url?u=https-3A__localcivics.us5.list-2Dmanage.com_unsubscribe-3Fu-3Dadbb329311074b5cd6c7abbcf-26id-3D3ff118c070-26e-3D4c221502e8-26c-3D1d48f6db95&d=DwMFaQ&c=009klHSCxuh5AI1vNQzSO0KGjl4nbi2Q0M1QLJX9BeE&r=3IHjltefCtOlhcNxb9fORpTXY6gZe6GiGmNzCtcv7nc&m=SLjAejU1cXtuKCYjClySdGJQyRa0UYS8M9qiB6N_YihANEamdcApS3nDHqnSjElJ&s=NJ2mjdOr_9D3QO_RQNzOBw-KPdTZT4nFgDHaXma33_A&e=" className="text-white underline">unsubscribe from this list</a>.</p>
                </div>
            </div>
        </div>
    );
};