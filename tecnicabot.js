var builder = require('botbuilder');
var restify = require('restify');
var moment = require('moment');

/*var GoogleMapsLoader = require('google-maps'); // only for common js environments 
 
GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});*/

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID="1fb8354c-270a-4a63-bd5f-0965e781d107",
    appPassword: process.env.MICROSOFT_APP_PASSWORD="6RkjkZBqmZbcnh6AH32T7Dp",
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//MENUS
    const menu_principal = 'Menú principal';
    const menu_anterior = 'Menú anterior'
    const Cardmenus = [menu_principal,menu_anterior];

 //OPCIONES DE MENU DE BIENVENIDA
    const nuestros_productos = 'Nuestros Productos';
    const otros_servicios_asistencia = 'Otros Servicios/Asistencia';
    const contactenos = 'Contáctenos';
    const nosotros = 'Nosotros';
    const salir = 'Salir';
    const CardNames = [nuestros_productos, otros_servicios_asistencia, nosotros, contactenos, salir];

//NUESTROS PRODUCTOS - RAMOS  
    const ramos_personales = 'Ramos Personales';
    const ramos_generales = 'Ramos Generales';
    const CardProductos = [ramos_personales,ramos_generales, salir];

//NUESTROS PRODUCTOS - RAMOS - PERSONALES 
    const ramos_personales_salud = 'Salud';
    const ramos_personales_vida = 'Vida';
    const CardProductosRamosPersonales = [ramos_personales_salud,ramos_personales_vida];

    const ramos_generales_auto = 'Auto';
    const ramos_generales_incendio = 'Incendio';
    const ramos_generales_multipolizas = 'Multipólizas';
    const ramos_generales_fianzas = 'Fianzas';
    const ramos_generales_CAR_EAR = 'CAR & EAR';
    const ramos_generales_responsabilidadcivil = 'Responsabilidad Civil';
    const CardProductosRamosGenerales = [ramos_generales_auto,ramos_generales_incendio,
                                         ramos_generales_multipolizas,ramos_generales_fianzas,
                                         ramos_generales_CAR_EAR,ramos_generales_responsabilidadcivil];

//NUESTROS PRODUCTOS - RAMOS PERSONALES-SALUD
    const ramos_personales_salud_clocal = 'Cobertura local';
    const ramos_personales_salud_cinter = 'Cobertura Internacional';
    const CardProductosRamosPersonalesSalud = [ramos_personales_salud_clocal,ramos_personales_salud_clocal, salir];

//NUESTROS PRODUCTOS - RAMOS PERSONALES-VIDA
    const ramos_personales_vida_vidaindividual = 'Vida Individual';
    const ramos_personales_vida_colectivovida = 'Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)';
    const CardProductosRamosPersonalesVida = [ramos_personales_vida_vidaindividual,ramos_personales_vida_colectivovida, salir];

//NUESTROS PRODUCTOS - RAMOS PERSONALES-VIDA-COLECTIVO SUNTRACS
    const ramos_personales_vida_colectivovida_requisitos = 'Requisitos para Apertura de Póliza';
    const ramos_personales_vida_colectivovida_reclamos= 'Documentación para Reclamos';
    const CardProductosRamosPersonalesVidaColectivoSuntracs2 = [ramos_personales_vida_colectivovida_requisitos,
                                                               ramos_personales_vida_colectivovida_reclamos,salir];

// Bot dialog INICIO
bot.dialog('/', [
    function(session){
    var menucard = new builder.HeroCard(session)
            .title("TECNICA DE SEGUROS, INC.")
            .text("SOMOS ESPECIALISTAS EN PLANES DE SEGUROS PARA LOS SECTORES ECONÓMICOS DE MAYOR MOVIMIENTO EN EL PAÍS, CONTAMOS CON UNA TRAYECTORIA DE MÁS DE 20 AÑOS DE SERVICIO.")
            .images([
                 builder.CardImage.create(session, "http://www.sonofertas.com/uploads/companies/logos/000/000/175/full/tds%20logo-01.jpg")
            ]);
        var mensajemenu = new builder.Message(session).attachments([menucard]);
        session.send(mensajemenu);
        session.beginDialog('/menu');
    }
]);                 

bot.dialog('/menu', [
    function (session, results) {
    builder.Prompts.choice(session, "*BIENVENIDO A TECNICA DE SEGUROS, INC.*", ["Nuestros Productos","Otros Servicios/Asistencia","Nosotros","Contáctenos"],{listStyle: builder.ListStyle.list});
    },
    function (session, results) {
    switch (results.response.index) {
        case 0:
            session.beginDialog('/Nuestros Productos');
            break;
        case 1:
            session.beginDialog('/Otros Servicios/Asistencia');
            break;
        case 2:
            session.beginDialog('/Nosotros');
            break;
        case 3:
            session.beginDialog('/Contáctenos');
            break;
        default:
            break;
    }
    }  
]);

//  DIALOG CONSULTAR 
bot.dialog('/Nuestros Productos', [
    function(session){
        builder.Prompts.choice(session, ["NUESTROS PRODUCTOS"], ["Ramos Personales","Ramos Generales", "Fianzas","Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductos = results.response.entity;
        var CardProductos = createCardProductos(selectedCardProductos, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS
function createCardProductos(selectedCardProductos, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductos) {
        case ramos_personales:
            session.beginDialog('/Ramos Personales');
            break;
        case ramos_generales:
            session.beginDialog('/Ramos Generales');
            break;
        case fianzas:
            session.beginDialog('/Fianzas');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

//DIALOG RAMOS PERSONALES - SALUD -VIDA
bot.dialog('/Ramos Personales', [
    function(session){
        builder.Prompts.choice(session, ["RAMOS PERSONALES"], ["Salud","Vida", "Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductosRamosPersonales = results.response.entity;
        var CardProductosRamosPersonales = createCardProductosRamosPersonales(selectedCardProductosRamosPersonales, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMOS PERSONALES -SALUD-VIDA-MENU
function createCardProductosRamosPersonales(selectedCardProductosRamosPersonales, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductosRamosPersonales) {
        case ramos_personales_salud:
            session.beginDialog('/Salud');
            break;
        case ramos_personales_vida:
            session.beginDialog('/Vida');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

//DIALOG RAMOS PERSONALES - SALUD
bot.dialog('/Salud', [
    function(session){
        builder.Prompts.choice(session, ["Ramos Personales - Salud"], ["Cobertura Local","Cobertura Internacional", "Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductosRamosPersonalesSalud = results.response.entity;
        var CardProductosRamosPersonalesSalud = createCardProductosRamosPersonalesSalud(selectedCardProductosPersonalesSalud, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMOS PERSONALES - SALUD-MENU
function createCardProductosRamosPersonalesSalud(selectedCardProductosRamosPersonalesSalud, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductosRamosPersonalesSalud) {
        case ramos_personales_salud_clocal:
            session.beginDialog('/Cobertura Local');
            break;
        case ramos_personales_salud_cinter:
            session.beginDialog('/Cobertura Internacional');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

//DIALOG RAMOS PERSONALES - VIDA
bot.dialog('/Vida', [
    function(session){
        builder.Prompts.choice(session, ["Ramos Personales - Vida"], ["Vida Individual","Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)", "Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductosRamosPersonalesVida = results.response.entity;
        var CardProductosRamosPersonalesVida = createCardProductosRamosPersonalesVida(selectedCardProductosRamosPersonalesVida, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMOS PERSONALES - VIDA-MENU
function createCardProductosRamosPersonalesVida(selectedCardProductosRamosPersonalesVida, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductosRamosPersonalesVida) {
        case ramos_personales_vida_vidaindividual:
            session.beginDialog('/Vida Individual');
            break;
        case ramos_personales_vida_colectivovida:
            session.beginDialog('/Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

//DIALOG RAMOS PERSONALES - VIDA
bot.dialog('/Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)', [
    function(session){
        builder.Prompts.choice(session, ["Vida- Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)"], ["Requisitos para Apertura de Póliza","Documentación para Reclamos", "Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductosRamosPersonalesVidaColectivoSuntracs2 = results.response.entity;
        var CardProductosRamosPersonalesVidaColectivoSuntracs2 = createCardProductosRamosPersonalesVidaColectivoSuntracs2(selectedCardProductosRamosPersonalesVidaColectivoSuntracs2, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMOS PERSONALES - VIDA-MENU
function createCardProductosRamosPersonalesVidaColectivoSuntracs2(selectedCardProductosRamosPersonalesVidaColectivoSuntracs2, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductosRamosPersonalesVidaColectivoSuntracs2) {
        case ramos_personales_vida_colectivovida_requisitos:
            session.beginDialog('/Requisitos para Apertura de Póliza');
            break;
        case ramos_personales_vida_colectivovida_reclamos:
            session.beginDialog('/Documentación para Reclamos');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

//DIALOG RAMOS PERSONALES - VIDA - COLECTIVO DE VIDA (SUNTRACS Y EMPRESAS INDEPENDIENTES)


/*function createCardmenus(selectedCardmenus, session) {  //PRESENTAR PRODUCTOS EN LIST
    switch (selectedCardmenus) {
        case menu_principal:
            session.beginDialog('/')
            break;
        case menu_anterior:
            session.beginDialog('/Colectivo de Vida (SUNTRACS Y EMPRESAS INDEPENDIENTES)')
            break;
        default:
            break;
    }
}*/
//prueba

bot.dialog('/Requisitos para Apertura de Póliza', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.ThumbnailCard(session)
                    .title('Requisitos para Apertura de Póliza')
                    .subtitle('Documentos que debe llenar y posteriormente firmar: '+'\n\n'+'1.Formulario de Inscripción'+'\n\n\n'+'2.Formulario Conozca su Cliente \n3.Copia del aviso de operación \n4.Copia de cédula o pasaporte del representante legal \n5.Listado de personal: Nombre, No. Cédula')
                    .text('______________')
                    .images([
                        builder.CardImage.create(session, 'http://sanandres.gov.co/html_pages/Preguntas_y_Respuestas_Frecuentes2/images/Documentos.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-00-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/63l14fi6bm3cgk7tcmgei67v0612n329/1498852800000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhOVFfOHJQUWE5a00?e=download', 'Documentos-Persona Natural'),
                        builder.CardAction.downloadFile(session, 'https://doc-08-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/7krnsuqm80lc9k5ic6fkvvmm6m52k2g9/1498852800000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhZExNV1pheEhCc0k?e=download', 'Documentos-Persona Jurídica')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Requisitos para Apertura de Póliza')
                    .subtitle('1.Formulario de Inscripción de la Póliza')
                    .text('______________')
                    .images([
                        builder.CardImage.create(session, 'http://ian.umces.edu/imagelibrary/albums/userpics/10020/normal_ian-symbol-legislation-01.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0g-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/cjmdomes51n129mtn4tj13jpo580pmuh/1498766400000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhRzRlczl6OFp6SXc?e=download'+'\n'+'Esperamos pronto su visita o enviar los documentos llenos al correo: colectivo.suntracs@tecnicadeseguros.com', 'Descargar Formulario')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('*Requisitos para Apertura de Póliza*')
                    .subtitle('2.Formulario Conozca su Cliente (Establecido por la Superintendencia de Seguros y Reasegurados de Panamá)')
                    .text('El mismo depende, si es persona natural o persona jurídica')
                    .images([
                        builder.CardImage.create(session, 'http://superseguros.gob.pa/images/img/iconos/ssr.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-08-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/2rvcnc3qr0bo898dapdk9sasu293hu8i/1498766400000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhTnJsYm9rUEluNVU?e=download', 'Para persona natural'),
                        builder.CardAction.downloadFile(session, 'https://doc-00-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/2fsqg5jl1r47l9fls89k55ig8a00evf9/1498766400000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhR2FQZHRTdVF3Zkk?e=download', 'Para persona jurídica')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('*Requisitos para Apertura de Póliza*')
                    .subtitle('3.Copia del aviso de operación')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://1.bp.blogspot.com/_VOLunj1oFvI/R3sqBT-dbwI/AAAAAAAAAHc/ZqgGeXg3efk/s320/Aviso+de+operacion+AUSSIE+como+empresa.jpg')
                    ])
                    /*.buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/documentdb/', 'Learn More')
                    ])*/,
                new builder.ThumbnailCard(session)
                    .title('*Requisitos para Apertura de Póliza*')
                    .subtitle('4.Copia de cédula o pasaporte del representante legal')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://cdn3.iconfinder.com/data/icons/e-commerce-web/400/passport_and_air_ticket-512.png')
                    ])
                    /*.buttons([
                        builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/services/documentdb/', 'Learn More')
                    ])*/,
                new builder.ThumbnailCard(session)
                    .title('*Requisitos para Apertura de Póliza*')
                    .subtitle('5.Listado de personal: Nombre, No. Cédula')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://cdn.businessformtemplate.com/samples/Sign_Up_Sheet.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0g-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/79u3kll9jnmv98ilh0ugn619t4epo3rt/1498766400000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhTXd4TUhEdlh4eEE?e=download&nonce=5j2qu5k390da0&user=05247221598363748859&hash=m650okvac8ombr7hu3lvplung59p8f5n', 'Descargar hoja')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('*Requisitos para Apertura de Póliza*')
                    .subtitle('COBERTURAS')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://static.comunicae.com/photos/notas/1120173/1434539720_Renta_Vitalicia_Inmobiliari.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0c-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/q7j1mp95q842mq7soof7fil5l6mfpt8v/1498852800000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhQjVsc3dfRk1LbmM?e=download', 'Descargar hoja')
                    ])
            ]);
        builder.Prompts.choice(session, msg, "_________________");
        
        //session.endDialog(msg);
        /*session.userData.reservarmodeloauto = results.response;
        msg = session.userData.reservarmodeloauto;*/
        return msg;
}
    ]);
                               

//DOCUMENTACION PARA RECLAMOS

bot.dialog('/Documentación para Reclamos', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('1.RECLAMOS DE ALUMBRAMIENTO')
                    .text('IMPORTANTE: Alumbramiento Múltiple solo pagara el máximo de B/600.00 balboas, también se debe entregar el certificado de nacimiento por cada niño(a) nacido.')
                    .images([
                        builder.CardImage.create(session, 'https://massaludfisioterapiayosteopatia.files.wordpress.com/2014/03/tripa-embarazada.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-00-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/f912gp4eai7khmubofh6tf4uok9spj8a/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhQ1NGZjZfaGRDNWM?e=download&nonce=0vcf67obn1cjm&user=05247221598363748859&hash=juna6ugt02tkvfkm9ci30j1du6134qpj', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('2.MUERTE DE GRUPO FAMILIAR (CONYUGUE, PADRE O HIJOS)')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://www.shareicon.net/data/512x512/2015/11/27/678748_group_512x512.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-08-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/7sb22lpnjlf0urd7jeu4q0j6b0limi25/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhVDNSRWdKRTVmeEE?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('3.REEMBOLSO DE GASTOS MEDICOS')
                    .text('EL LIMITE DE REEMBOLSO DE GASTOS MEDICOS ES HASTA B/. 1000.00 BALBOAS. POR ACCIDENTE LABORAL, Y POR AÑO (VIGENCIA DE LA POLIZA).')
                    .images([
                        builder.CardImage.create(session, 'http://cmsseguros.es/landings/saludautomocion/img/icono-medicos.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0g-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/lsnsd8ha6ijv44mr9vv8lgpo42s9ovqt/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhSGRvTHF1Y0NUT2s?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('4.MUERTE POR CUALQUIER CAUSA (TRABAJADOR)')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://www.tangassi.com/wp-content/uploads/2014/07/cruz.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0s-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/rpfph7qr1ql6r81biuk7houkgtirmt6l/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhbU13UkkySnN0OFU?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('5.MUERTE ACCIDENTAL DENTRO DEL AREA DE TRABAJO')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://www.eltelegrafo.com.ec/media/k2/items/cache/16c611017a406e90d59875798a434438_XL.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0o-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/l7unc71s65lu913g9mjg76rusinc3em0/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhWklQNFVic2Vqa0E?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('6.MUERTE ACCIDENTAL FUERA DEL AREA DE TRABAJO')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://clipart-library.com/img/1861652.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0g-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/cjmdomes51n129mtn4tj13jpo580pmuh/1498766400000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhRzRlczl6OFp6SXc?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('7.DESMEMBRAMIENTO O PÉRDIDA DEL MIEMBRO')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'https://previews.123rf.com/images/konart/konart1108/konart110800017/10269592-Lesionado-mano-masculina-con-la-parte-superior-del-cuerpo-Mano-se-vende-con-yeso-rojo-enfoque-conjun-Foto-de-archivo.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0s-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/r114dcrtci29f1kjkot8bjv3hrh9g85e/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhUS1IcVY2SXV1Ylk?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('8.BENEFICIO DE CANCER EN SOLO PAGO')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://www.utp.ac.pa/sites/default/files/CINTA%20ROSADA.png')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0o-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/7nlhvphavabnchdhfp4sk615tpotko68/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhU3JDRk13YV9uRGs?e=download','Descargar PDF')
                    ]),
                 new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('9.RENTA POR INCAPACIDAD TOTAL Y PERMANENTE')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://i2.wp.com/www.segurobajadiaria.com/wp-content/uploads/2014/12/stickman_in_wheelchair_pc_400_clr_2475.png?w=788')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-04-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/oq9rq581mp1g24j3clpohim1a8u7mk6m/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhTXgxVU9jOXF0U00?e=download', 'Descargar PDF')
                    ]),
                new builder.ThumbnailCard(session)
                    .title('Documentación Requerida Para:')
                    .subtitle('10.BENEFICIOS DE GASTOS FUNERARIOS')
                    .text('')
                    .images([
                        builder.CardImage.create(session, 'http://www.radiopanama.com.pa/images_remote/207/2074272_n_vir1.jpg')
                    ])
                    .buttons([
                        builder.CardAction.downloadFile(session, 'https://doc-0k-b8-docs.googleusercontent.com/docs/securesc/7gan2vm3svkmcba6rq2l6qhncnq2trdk/lrafm9opsv0e3bdo8bfc9qf7r6sn8ca6/1498831200000/05247221598363748859/05247221598363748859/0B3kjgDfTi-RhSTZmYnJxbVdyTFU?e=download', 'Descargar PDF')
                    ])
            ]);
       // builder.Prompts.choice(session, msg, "Esperamos pronto su visita o enviar los documentos llenos al correo: colectivo.suntracs@tecnicadeseguros.com");
        //session.endDialog(msg);
        /*session.userData.reservarmodeloauto = results.response;
        msg = session.userData.reservarmodeloauto;*/
        return msg;
}
    
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMOS GENERALES
bot.dialog('/Ramos Generales', [
    function(session){
        builder.Prompts.choice(session, ["RAMOS GENERALES"], ["Auto","Incendio","Multipólizas","CAR & EAR","Responsabilidad Civil","Salir"],
         {listStyle: builder.ListStyle.list });
    },
    function (session, results){
        var selectedCardProductosRamosGenerales = results.response.entity;
        var CardProductosRamosGenerales = createCardProductosRamosGenerales(selectedCardProductosRamosGenerales, session);
    }
    ]);

//FUNCION PARA OPCIONES DE NUESTROS PRODUCTOS - RAMO
function createCardProductosRamosGenerales(selectedCardProductosRamosPersonales, session) {  //PRESENTAR PRODUCTOS EN LIST
    
    switch (selectedCardProductosRamosPersonales) {
        case ramos_personales_salud:
            session.beginDialog('/Auto');
            break;
        case ramos_personales_vida:
            session.beginDialog('/Incendio');
            break;
        case ramos_personales_salud:
            session.beginDialog('/Multipólizas');
            break;
        case ramos_personales_salud:
            session.beginDialog('/CAR & EAR');
            break;
        case ramos_personales_vida:
            session.beginDialog('/Responsabilidad Civil');
            break;
        case salir:
            session.beginDialog('/Salir');
            break;
        default:
            break;
    }
}

// MODELO DE AUTOS
bot.dialog('/Toyota', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.HeroCard(session)
                    .title("TOYOTA COROLLA")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.carztune.com/wp-content/uploads/2014/05/toyota-corolla.png")
                            .tap(builder.CardAction.showImage(session, "http://www.carztune.com/wp-content/uploads/2014/05/toyota-corolla.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Toyota Corolla", "Corolla")
                    ]),
                new builder.HeroCard(session)
                    .title("TOYOTA HILUX")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://www.toyotaqueretaro.com.mx/marcas/3251/images/landings/3704.png")
                            .tap(builder.CardAction.showImage(session, "http://www.toyotaqueretaro.com.mx/marcas/3251/images/landings/3704.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Toyota Hilux", "Hilux")
                    ]),
                new builder.HeroCard(session)
                    .title("TOYOTA HIACE")
                    .text("Incluye coberturas básicas. No Incluye impuestos ni cargos adicionales")
                    .images([
                        builder.CardImage.create(session, "http://adatoyota.com/images/slide/toyota-hiace.png")
                            .tap(builder.CardAction.showImage(session, "http://adatoyota.com/images/slide/toyota-hiace.png")),
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, "Ha seleccionado Toyota Hiace", "Hiace")
                    ])
            ]);
        builder.Prompts.choice(session, msg, "Ha seleccionado Toyota Corolla|Ha seleccionado Toyota Hilux|Ha seleccionado Toyota Hiace");
        //session.endDialog(msg);
        session.userData.reservarmodeloauto = results.response;
        msg = session.userData.reservarmodeloauto;
        return msg;
}
    ]);

//CONDICIONES ESTABLECIDAS
bot.dialog('/Condiciones de Alquiler', [
       function(session){
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("National Car Rental")
                    .subtitle("Disfrute del servicio que usted se merece")
                    .images([builder.CardImage.create(session, 'http://img.aws.ehowcdn.com/intl-620/ds-photo/getty/article/152/147/148173128.jpg','')])
                    .buttons([
                       builder.CardAction.openUrl(session, 'http://www.nationalpanama.com/condiciones-de-alquiler/', 'Conozca nuestras Condiciones de Alquiler')
                    ])
            ]);
             session.endDialog(msg);
        }
    ]);

//DIALOG INFORMACION DE LA EMPRESA
bot.dialog('/Nosotros', [
        function(session){
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("TECNICA DE SEGUROS, INC.")
                    .subtitle("22 AÑOS CONTIGO"+"\t\t"+"EXCELENCIA EN EL SERVICIO Y ATENCIÓN AL CLIENTE")
                    .text("\n\n"+"Hemos desarrollado a través de todos estos años de experiencia profesional (46 años), el concepto de la honradez profesional, el cual consiste en que nuestro cliente debe recibir absoluta y totalmente todo nuestro esfuerzo para satisfacer los requerimientos ya sea en la atención de un reclamo de seguros, elaboración de planes individuales o colectivos de seguros, tanto para personas como empresa, asociaciones, sindicatos y cooperativas. El concepto de lealtad profesional es total hacia nuestros clientes el cual no ha variado durante todos estos años, siendo nuestra carta de presentación y garantía. Moralmente, nos sentimos satisfechos y orgullosos de actuar de esa manera, correcta “el corredor de seguros es el mediador en la contratación del seguro entre el asegurado y la Compañía. En el ejercicio de su profesión tendrá la obligación de proteger los intereses del asegurado”")
                    .buttons([
                       builder.CardAction.openUrl(session, 'www.tecnicadeseguros.com', 'Sitio Web')
                    ])
            ]);
             session.endDialog(msg);
        }
    ]);

bot.dialog('/Contáctenos', [
        function(session){
         var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("TECNICA DE SEGUROS, INC.")
                    .subtitle("Dirección: Vía Ricardo J. Alfaro, Villa Cáceres")
                    .text("Teléfonos: 260-5015/6400-9850")
                    .buttons([
                       builder.CardAction.openUrl(session, 'https://goo.gl/maps/VNznBAAZvfR2', 'Ubicación'),
                       builder.CardAction.openUrl(session, 'https://www.tecnicadeseguros.com/', 'Sitio Web'),
                       builder.CardAction.call(session, '+507 260-5015', 'Llamar')
                    ])
            ]);
             session.endDialog(msg);
        }
    ]);


//OTROS SERVICIOS/ASISTENCIA

bot.dialog('/Otros Servicios/Asistencia', [
    function(session){
    var msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                new builder.ThumbnailCard(session)  //1
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('PLOMERIA')
                    .images([
                        builder.CardImage.create(session, 'http://www.amazingrooterplomero.com/files/2016/09/servicios-de-plomeria.jpg')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ]),
                new builder.ThumbnailCard(session)   //2
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('CERRAJERIA')
                    .images([
                        builder.CardImage.create(session, 'http://www.cerrajeroalllocks.com/wp-content/uploads/cerrajero-san-juan-puerto-r.jpg')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ]),
                new builder.ThumbnailCard(session)  //3
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('ELECTRICISTA')
                    .images([
                        builder.CardImage.create(session, 'https://serviciosurgenteszaragoza.com/wp-content/uploads/2014/07/cuadros-electricos-en.jpg')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ]),
                new builder.ThumbnailCard(session)   //4
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('SOLDADURA')
                    .images([
                        builder.CardImage.create(session, 'https://seeklogo.com/images/S/soldador-logo-C9087233C0-seeklogo.com.png')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ]),
                new builder.ThumbnailCard(session)   //4
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('CARPINTERO')
                    .images([
                        builder.CardImage.create(session, 'http://www.gifs-animados.es/profesiones-imagenes/profesiones-imagenes/carpintero/gifs-animados-carpintero-9113855.gif')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ]),
                new builder.ThumbnailCard(session)   //5
                    .title('ASISTENCIA')
                    .subtitle('Siempre Disponible!!!')
                    .text('ALBAÑILERIA')
                    .images([
                        builder.CardImage.create(session, 'https://images.sipse.com/2_19ZoDEF4ExPyZGo156Ytoh8YI=/800x497/smart/imgs/052013/0305135ba8d553d.jpg')
                    ])
                    .buttons([
                        builder.CardAction.call(session, '+507 260-5015', 'LLAMAR')
                    ])
            ]);
            builder.Prompts.choice(session, msg, "_________________");
       // builder.Prompts.choice(session, msg, "Esperamos pronto su visita o enviar los documentos llenos al correo: colectivo.suntracs@tecnicadeseguros.com");
        //session.endDialog(msg);
        /*session.userData.reservarmodeloauto = results.response;
        msg = session.userData.reservarmodeloauto;*/
        return msg;
}
    
    ]);
