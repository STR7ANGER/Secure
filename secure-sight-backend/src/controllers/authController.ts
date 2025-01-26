import { UserProps } from '../types/types';
import { sendRegisterInfo, sendUserDetail } from '../utils/auth-util';
import { OTHER, COLLECTIONS } from '../constant';
import { dynamicModelWithDBConnection } from '../models/dynamicModel';
import { sendEmail } from '../helper/email.helper';

class AuthController {
  async register(params: UserProps) {
    return sendRegisterInfo(params);
  }

  async login(params: UserProps) {
    return new Promise(async (resolve) => {
      const res = await sendUserDetail(params);
      resolve(res);
    });
  }

  async licenseKey(params: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let response;
        let dbName = process.env.mongo_db || '';
        const dm = await dynamicModelWithDBConnection(
          dbName,
          COLLECTIONS.LICENSE
        );
        const generateRandomString = (len: any) => {
          var text = '';
          var charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
          return text;
        };
        const licenseKey = generateRandomString(16);
        const userScheduleData = {
          email: params.email,
          licenseKey: licenseKey,
          expiryDate: params.expiryDate,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const doc = await dm(userScheduleData);
        await doc.save();
        if (doc) {
          let htmlBody = `<h3>Your license key is <b style="color:red;font-size: 20px"> ${licenseKey}</b> and it is expired on <b style="color:red;font-size: 20px"> ${params.expiryDate}</b></h3>`;
          let subjectData = `Congratulations license key is generated successfully!!!!`;
          let emailData = {
            to: params.email,
            html: htmlBody,
            subject: subjectData
          };
          sendEmail(emailData);
          response = {
            success: true,
            status: 200,
            msg: `License key is generated successfully and send to the email`
          };
          resolve(response);
          return;
        } else {
          response = {
            success: false,
            status: 404,
            msg: `failed to generated license key`
          };
          resolve(response);
          return;
        }
      } catch (e: any) {
        let response = {
          success: false,
          status: 500,
          msg: e?.message || 'internal server error'
        };
        throw response;
      }
    });
  }
}

export default new AuthController();
