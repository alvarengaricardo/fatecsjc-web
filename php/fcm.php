<?php

    // 18-09-17
    
    // recebe decodificando para objetos php
    $mensagem = json_decode($_POST["mensagem"]);

    define( 'API_ACCESS_KEY', 'AAAARGOZHJA:APA91bHy0tqqtDQ90XUwjaerd1viSjN3OqWE_s3Iips2xr7PHq2xU1Dr9DnQ9KzZ2Yw-9ILTg5yjvQEeixvEQeKUNffKTiFRfaPSY5oYPIvYbC6BZ2KZTexhG_HUVq0fBBSffjEPQYUK' );

    // prepara os dados

    $msg = array
    (
        'body'  => $mensagem->corpo,
        'title'     => $mensagem->titulo,
    );

    $fields = array
    (
        'to'  => '/topics/fatec',
        'notification'          => $msg
    );

    $headers = array
    (
        'Authorization: key=' . API_ACCESS_KEY,
        'Content-Type: application/json'
    );

    // envia dados para FCM
    $ch = curl_init();
    curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
    curl_setopt( $ch,CURLOPT_POST, true );
    curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
    curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
    curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
    $result = curl_exec($ch );
    curl_close( $ch );
    echo $result;

?>