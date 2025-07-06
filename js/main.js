document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const formatSelect = document.getElementById("outputFormat");
    const status1 = document.getElementById("status1");
    const status2 = document.getElementById("status2");
    const botao = document.getElementById("botaoConverter");

    const apiKey = "blJGGe6gAEUpm387KjjWSWTaZhCEgbGB";

    // Feedback visual ao selecionar o arquivo
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            status1.textContent = `Arquivo selecionado: ${file.name}`;
        } else {
            status1.textContent = "Nenhum arquivo selecionado.";
        }
    });

    // Feedback ao selecionar formato
    formatSelect.addEventListener("change", function () {
        const format = this.value;
        status2.textContent = `Formato de saída selecionado: ${format}`;
    });

    // Botão de conversão
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

        // 1. Upload do arquivo para a ConvertAPI
        const formData = new FormData();
        formData.append("File", file);

        try {
            const uploadResponse = await fetch("https://v2.convertapi.com/upload", {
                method: "POST",
                body: formData
            });

            const uploadResult = await uploadResponse.json();
            const fileUrl = uploadResult.FileUrl;

            // 2. Requisição de conversão
            const convertResponse = await fetch(`https://v2.convertapi.com/convert/${file.name.split('.').pop()}/to/${outputFormat}?Secret=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Parameters: [
                        {
                            Name: "File",
                            FileValue: { Url: fileUrl }
                        }
                    ]
                })
            });

            const convertData = await convertResponse.json();
            const downloadUrl = convertData.Files[0].Url;

            status2.textContent = "Conversão concluída! Iniciando download...";

            // 3. Download automático do arquivo convertido
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = `convertido.${outputFormat}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error("Erro na conversão:", error);
            status2.textContent = "Erro ao converter o arquivo. Tente novamente.";
        }
    });
});