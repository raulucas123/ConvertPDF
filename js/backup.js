            
            document.getElementById('fileInput').addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    document.getElementById('status1').textContent = `Arquivo selecionado: ${file.name}`;
                } else {
                    document.getElementById('status1').textContent = 'Nenhum arquivo selecionado.';
                }
            });
            // Script para exibir o formato de saída selecionado
            document.getElementById('outputFormat').addEventListener('change', function() {
                const format = this.value;
                document.getElementById('status2').textContent += ` Formato de saída selecionado: ${format}`;
                const form = document.getElementById('outputFormat').closest('form');
                const outputFormat = document.getElementById('outputFormat');
                form.addEventListener('submit', function (e) {
                    if (outputFormat.value === "none") {
                        e.preventDefault(); // Impede o envio do formulário
                        alert('Por favor, selecione um formato de saída antes de continuar.');
                    }
                });
        });
        //botao de conversão
        const botao = document.getElementById("converterbutton");
         botao.addEventListener("click", async function () {
        const file = fileInput.files[0];
        const outputFormat = formatSelect.value.replace(".", "");

        if (!file) {
            alert("Selecione um arquivo primeiro.");
            return;
        }

        if (outputFormat === "none") {
            alert("Selecione um formato de saída.");
            return;
        }

        status2.textContent = "Enviando arquivo para conversão...";
        // Cria um FormData para envio
        const formData = new FormData();
        formData.append("File", file);

        try {
            // Envia para a API ConvertAPI
            const response = await fetch(`https://v2.convertapi.com/upload`, {
                method: "POST",
                body: formData
            });

            const uploadResult = await response.json();
         // Agora converte o arquivo com o link de upload
            const convertResponse = await fetch(`https://v2.convertapi.com/convert/${file.name.split('.').pop()}/to/${outputFormat}?Secret=blJGGe6gAEUpm387KjjWSWTaZhCEgbGB`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Parameters: [
                        {
                            Name: "File",
                            FileValue: {
                                Url: uploadResult.FileUrl
                            }
                        }
                    ]
                })
            });

            const convertData = await convertResponse.json();
            const downloadUrl = convertData.Files[0].Url;

            status2.textContent = "Conversão concluída! Iniciando download...";
        // Cria um link e força o download
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `convertido.${outputFormat}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Erro na conversão:", error);
            status2.textContent = "Erro na conversão. Tente novamente.";
        }
    });
// Script para lidar com a conversão de arquivos usando a API ConvertAPI
    // Aqui estão as chamadas para a API ConvertAPI para diferentes formatos de conversão        
        // Api 1
        fetch("https://v2.convertapi.com/convert/txt/to/pdf", {
            method: "POST",
            headers: {
                "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": ".txt",
            "outputformat": "pdf",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
    // api 2
    fetch("https://v2.convertapi.com/convert/xls/to/pdf", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": "csv, xls, xlsb, xlsx, xltx",
            "outputformat": "pdf",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
    // api 3
    fetch("https://v2.convertapi.com/convert/potx/to/pdf", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            "inputformat": "potx, pps, ppsx, ppt, pptx",
            "outputformat": "pdf",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
// api 4
    fetch("https://v2.convertapi.com/convert/docx/to/pdf", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": "docx, doc",
            "outputformat": "pdf",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
// api 5
    fetch("https://v2.convertapi.com/convert/pdf/to/pptx", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": "pdf",
            "outputformat": "pptx",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
// api 6
    fetch("https://v2.convertapi.com/convert/pdf/to/xlsx", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": "pdf",
            "outputformat": "xlsx",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    });
   // api 7
    fetch("https://v2.convertapi.com/convert/pdf/to/docx", {
        method: "POST",
        headers: {
            "Authorization": "Bearer blJGGe6gAEUpm387KjjWSWTaZhCEgbGB",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputformat": "pdf",
            "outputformat": "docx",
            "file": FormData() // TODO: substituir por arquivo selecionado
        })
    })
    .then(response => response.json())
    .then(data => {
        // Lógica para lidar com o arquivo convertido
    }); 
    