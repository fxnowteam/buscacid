function backButtonPressed() {
    navigator.app.exitApp();
}

function conecta(){
    return openDatabase('buscacid10paico', '1.0', 'Busca CID10', 2 * 1024 * 1024);
}

// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
    var db = conecta();

    db.transaction(function (tx) {  
       tx.executeSql('DROP DATABASE IF EXISTS cid10', [], $("#resultados").html('Apagou cid10!<br>'), function(tx, error){
            $("#resultados").html('deu merda ao apagar cid10...'+error);
        });
       tx.executeSql('DROP DATABASE IF EXISTS contador');
       tx.executeSql('CREATE TABLE IF NOT EXISTS cid10 (id INTEGER PRIMARY KEY AUTOINCREMENT, CAT, SUBCAT, CLASSIF, RESTRSEXO, CAUSAOBITO, DESCRICAO, DESCRABREV, REFER, EXCLUIDOS)');
       tx.executeSql('CREATE TABLE IF NOT EXISTS contador (id INTEGER PRIMARY KEY AUTOINCREMENT, conta INTEGER)');
       tx.executeSql('UPDATE contador SET conta = conta + 1');
        db.transaction(function (tx) {  
           tx.executeSql('INSERT INTO cid10 (CAT, DESCRICAO) VALUES (?,?)', ['m54', 'dor lombar']);
        });
    });
}

function buscar(){
    $("#resultados").html("");
    var db = conecta();
    var termo = $("#termo").val();
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM cid10', [], function (tx, results) {
           var len = results.rows.length, i;
           msg = "<p>Found rows: " + len + "</p>";
           document.querySelector('#resultados').innerHTML +=  msg;

           for (i = 0; i < len; i++){
              msg = "<p><b>" + results.rows.item(i).id + "</b></p>";
              document.querySelector('#resultados').innerHTML +=  msg;
           }
        }, $("#resultados").html('Erro...'));
    });
}

function add(){
    $("#resultados").html('');
    var termo = $("#termo").val();
    var db = conecta();

    db.transaction(function (tx) {  
       tx.executeSql('INSERT INTO cid10 (DESCRICAO) VALUES (?)', [termo]);
    });
    $("#resultados").html('Inserido: '+termo);
    
    //buscar();
}