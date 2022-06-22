$(function () {
    let $field = $("#cep");
    $field.mask('00.000-000', {reverse: true});

    $("#zip-form").submit(function (event) {
        let zipCode = $field.val();
        if (!zipCode) {
            alert('Insira o CEP antes de pesquisar.');
            return;
        }

        $('#zip-code-div').remove();

        checkZipCode(zipCode);
        event.preventDefault();
    });

    function checkZipCode(zipCode) {
        zipCode = zipCode.replace(/\.|-/gi, '');
        fetch('https://viacep.com.br/ws/' + zipCode + '/json/')
            .then(
                function (response) {
                    response.json().then(function (data) {
                        let section = document.getElementById('section');
                        let div = document.createElement('div');
                        div.style.fontSize = '50px';
                        div.style.fontFamily = 'Kdam Thmor Pro';
                        div.id = 'zip-code-div';

                        if (data.erro) {
                            let p = document.createElement('p');
                            let error = document.createTextNode('CEP NÃO ECONTRADO!');
                            p.appendChild(error);
                            div.appendChild(p);
                            section.appendChild(div);
                            return;
                        }

                        let p = document.createElement('p');
                        let p1 = document.createElement('p');
                        let p2 = document.createElement('p');
                        let city = document.createTextNode('CIDADE: ' + data.localidade);
                        let district = document.createTextNode('BAIRRO: ' + data.bairro);
                        let address = document.createTextNode('ENDEREÇO: ' + data.logradouro);
                        p1.appendChild(city);
                        p.appendChild(district);
                        p2.appendChild(address);
                        div.appendChild(p1);
                        div.appendChild(p);
                        div.appendChild(p2);
                        section.appendChild(div);
                    })
                }
            );
    }
});


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


