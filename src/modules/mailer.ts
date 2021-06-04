import nodemailer, { Transporter } from 'nodemailer';
import { resolve } from 'path';
import handlebars from 'handlebars';
import fs from 'fs';
import { getYear } from 'date-fns';

require('dotenv/config');

export interface DocumentsProps {
    item: string;
    document: string;
}

export interface DocumentsListProps {
    item: string;
    document: string;
}

class Mailer {
    private client: Transporter;

    constructor() {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        this.client = transporter;
    }

    private async execute(to: string, subject: string, variables: object, hbsTemplatePath: string, text: string) {
        const hbsTemplate = fs.readFileSync(hbsTemplatePath).toString("utf-8");

        const mailTemplateParse = handlebars.compile(hbsTemplate);

        const html = mailTemplateParse(variables);

        await this.client.sendMail({
            to,
            subject,
            html,
            text,
            from: `${process.env.STORE_NAME} ${process.env.EMAIL_USER}`,
        });
    }

    async sendNewCustomerEmail(email: string, token: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            token,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "newCustomer.hbs");

        const text = `Bem-vindo a ${process.env.STORE_NAME}.
        Para confirmar o seu e-mail,
        digite no aplicativo o código a seguir:
        ${token}`;

        await this.execute(email, "Bem-vindo(a).", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send new user e-mail: ', err);
            return false
        });
    }

    async sendNewUserEmail(name: string, email: string, link: string) {
        const variables = {
            name,
            store_name: process.env.STORE_NAME,
            link,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "newUser.hbs");

        const text = `Olá, ${name}
        Bem-vindo a plataforma de pedidos e entregas OrderN.
        Você foi convidado para ser integrante no sistema de gerenciamento do estabelecimento ${process.env.STORE_NAME}.
        Clique no link a seguir para aceitar e concluir o seu cadastro:
        ${link}`;

        await this.execute(email, "Bem-vindo(a).", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send new user e-mail: ', err);
            return false
        });
    }

    async sendDailyNotificationEmail(
        name: string,
        email: string,
        customerList: DocumentsListProps[],
        licensingList: DocumentsListProps[],
        projectList: DocumentsListProps[],
        propertyList: DocumentsListProps[]
    ) {
        let documents = [];

        if (customerList.length > 0) {
            documents.push(
                {
                    category: "Clientes",
                    documentList: customerList,
                }
            );
        }

        if (licensingList.length > 0) {
            documents.push(
                {
                    category: "Licensiamentos",
                    documentList: licensingList,
                }
            );
        }

        if (projectList.length > 0) {
            documents.push(
                {
                    category: "Projetos",
                    documentList: projectList,
                }
            );
        }

        if (propertyList.length > 0) {
            documents.push(
                {
                    category: "Imóveis",
                    documentList: propertyList,
                }
            );
        }

        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            documents,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "dailyNotification.hbs");

        const text = `Olá ${name}, Você tem documentos próximos de expirar.`;

        await this.execute(email, "Documentos expirando.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send daily notification e-mail: ', err);
            return false
        });
    }

    async sendCustomerResetPassword(name: string, email: string, token: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            token,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "resetCustomerPassword.hbs");

        const text = `Olá ${name},
        Recebemos a sua solicitação para trocar a sua senha,
        para prosseguir, digite no aplicativo o código a seguir:
        ${token}
        Caso não tenha sido você que solicitou a troca da sua senha, ignore este e-mail.`;

        await this.execute(email, "Recuperação de senha.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send reset user e-mail: ', err);
            return false
        });
    }

    async sendCustomerConfirmedResetPassword(name: string, email: string) {
        const variables = {
            store_name: process.env.STORE_NAME,
            name,
            current_year: getYear(new Date()),
        }

        const templatePath = resolve(__dirname, "..", "views", "emails", "confirmedResetCustomerPassword.hbs");

        const text = `Olá ${name}
        A sua senha de acesso ao aplicativo foi alterada.
        Caso não tenha sido você que solicitou a troca da senha.
        Acesse imediatamente o aplicativo e recupere a sua senha.`;

        await this.execute(email, "Senha alterada.", variables, templatePath, text).then(() => {
            return true;
        }).catch(err => {
            console.log('Error to send confirmed user e-mail: ', err);
            return false
        });
    }
}

export default new Mailer();