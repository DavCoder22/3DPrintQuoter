# Usar una imagen base oficial de Go 1.20
FROM golang:1.20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos go.mod y go.sum
COPY go.mod go.sum ./

# Descargar las dependencias
RUN go mod download

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN go build -o main .

# Exponer el puerto en el que la aplicación escuchará
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["./main"]
