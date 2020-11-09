var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BBw6bSDcn6Jo7x04cZlStt9_-3nHCNEt95NPi-e2GEvzY3cjVLKcdBD6itUT5F7xlpdGG4tO-t9sA1qC5QO1c3w",
    "privateKey": "PZGAykzjGAb9XKjpyWy-sMXuBHXJ8RI-uwbgcwHa_aU"
};

webPush.setVapidDetails(
    'mailto:denaherdiyani@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eqX5RmhIYFw:APA91bFVVHxzj7Jg76yAKdt2p6nBJVdoU3gM1-YnOGJUS7PNBkjBtuyMFTSguJa_JpHR55zrvJw0uysTX_20DbAGjv1wp7zCV_lnDJe3YOJxHujN2brLLJPBZcl0co9NMLhbdWEUZup0",
    "keys": {
        "p256dh": "BIDsMXeDOnpenx0XK+Cr70qBZqP+BkyVUTOvuE9etMAgLfOwWLWsrbBSVpNI1cdVriQs+oS+loFrhE9CyoU/pLU=",
        "auth": "aQowGc2xBZNxCvo88RYCQA=="        
    }
};

var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '1081859302729',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);