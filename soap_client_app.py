#!/usr/bin/env python3
"""
Aplicación de ejemplo para consumir un Web Service SOAP.

Esta aplicación utiliza la librería `zeep` para conectarse a un servicio SOAP público
de demostración (calculadora) y realizar operaciones básicas.

Requisitos:
    pip install zeep
"""

from zeep import Client
from zeep.transports import Transport
from zeep.plugins import HistoryPlugin
import logging

# Configuración de logging para ver detalles de las peticiones/respuestas SOAP
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')
logger = logging.getLogger(__name__)


class SoapClientApp:
    def __init__(self, wsdl_url: str):
        """
        Inicializa el cliente SOAP.
        
        Args:
            wsdl_url: La URL del archivo WSDL del servicio web.
        """
        # Historial para depuración (opcional pero recomendado)
        self.history = HistoryPlugin()
        transport = Transport()
        
        logger.info(f"Conectando al servicio SOAP en: {wsdl_url}")
        try:
            self.client = Client(wsdl=wsdl_url, transport=transport, plugins=[self.history])
            logger.info("Conexión exitosa. Servicios disponibles:")
            # Mostrar servicios disponibles (útil para exploración)
            if self.client.service:
                print(self.client)
        except Exception as e:
            logger.error(f"Error al conectar con el servicio: {e}")
            raise

    def add(self, a: int, b: int) -> int:
        """Ejemplo: Llama al método 'Add' del servicio de calculadora."""
        logger.info(f"Llamando a Add({a}, {b})...")
        result = self.client.service.Add(a, b)
        self._log_last_request()
        return result

    def subtract(self, a: int, b: int) -> int:
        """Ejemplo: Llama al método 'Subtract' del servicio de calculadora."""
        logger.info(f"Llamando a Subtract({a}, {b})...")
        result = self.client.service.Subtract(a, b)
        self._log_last_request()
        return result

    def multiply(self, a: int, b: int) -> int:
        """Ejemplo: Llama al método 'Multiply' del servicio de calculadora."""
        logger.info(f"Llamando a Multiply({a}, {b})...")
        result = self.client.service.Multiply(a, b)
        self._log_last_request()
        return result

    def divide(self, a: int, b: int) -> float:
        """Ejemplo: Llama al método 'Divide' del servicio de calculadora."""
        logger.info(f"Llamando a Divide({a}, {b})...")
        if b == 0:
            raise ValueError("No se puede dividir por cero.")
        result = self.client.service.Divide(a, b)
        self._log_last_request()
        return result

    def _log_last_request(self):
        """Muestra la última petición y respuesta XML para fines de depuración."""
        # Descomentar las siguientes líneas si necesitas ver el XML crudo
        # logger.debug("Última petición SOAP:")
        # logger.debug(self.history.last_sent['envelope'])
        # logger.debug("Última respuesta SOAP:")
        # logger.debug(self.history.last_received['envelope'])


def main():
    # URL del servicio WSDL público de demostración (Calculadora)
    # Este es un servicio de prueba comúnmente usado: http://www.dneonline.com/calculator.asmx?wsdl
    WSDL_URL = "http://www.dneonline.com/calculator.asmx?wsdl"

    try:
        # Instanciar la aplicación
        app = SoapClientApp(WSDL_URL)

        print("\n--- Ejecutando operaciones de prueba ---")
        
        # Realizar operaciones
        num1, num2 = 10, 5
        
        res_add = app.add(num1, num2)
        print(f"Resultado de {num1} + {num2} = {res_add}")

        res_sub = app.subtract(num1, num2)
        print(f"Resultado de {num1} - {num2} = {res_sub}")

        res_mul = app.multiply(num1, num2)
        print(f"Resultado de {num1} * {num2} = {res_mul}")

        res_div = app.divide(num1, num2)
        print(f"Resultado de {num1} / {num2} = {res_div}")

        print("\n--- Pruebas finalizadas con éxito ---")

    except Exception as e:
        print(f"\nOcurrió un error durante la ejecución: {e}")
        print("\nNota: Si el error es de conexión, es posible que el servicio público de demostración esté caído o inaccesible desde tu red.")


if __name__ == "__main__":
    main()
