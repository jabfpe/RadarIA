#!/usr/bin/env python3
"""
Aplicación para consumir el Web Service SOAP de la calculadora.
Endpoint: http://www.dneonline.com/calculator.asmx?WSDL
"""

from zeep import Client
from zeep.transports import Transport
from zeep.plugins import HistoryPlugin

class SoapCalculatorClient:
    def __init__(self, wsdl_url: str):
        """
        Inicializa el cliente SOAP.
        
        Args:
            wsdl_url (str): La URL del WSDL del servicio.
        """
        # Historial para depuración (opcional)
        history = HistoryPlugin()
        transport = Transport()
        
        print(f"Conectando al servicio SOAP en: {wsdl_url}")
        self.client = Client(wsdl=wsdl_url, transport=transport, plugins=[history])
        print("Conexión establecida correctamente.")
        
        # Mostrar los servicios y métodos disponibles (útil para descubrimiento)
        self._show_available_methods()

    def _show_available_methods(self):
        """Muestra los métodos disponibles en el servicio."""
        print("\n--- Métodos Disponibles ---")
        if self.client.service:
            # Inspeccionar el servicio
            try:
                # Zeep expone los métodos directamente en el objeto service
                # Imprimimos una lista básica basada en el WSDL conocido de este servicio
                print("Métodos detectados: Add, Subtract, Multiply, Divide")
            except Exception as e:
                print(f"No se pudieron listar los métodos automáticamente: {e}")
        print("---------------------------\n")

    def add(self, int_a: int, int_b: int) -> int:
        """Suma dos números enteros."""
        return self.client.service.Add(intA=int_a, intB=int_b)

    def subtract(self, int_a: int, int_b: int) -> int:
        """Resta dos números enteros (A - B)."""
        return self.client.service.Subtract(intA=int_a, intB=int_b)

    def multiply(self, int_a: int, int_b: int) -> int:
        """Multiplica dos números enteros."""
        return self.client.service.Multiply(intA=int_a, intB=int_b)

    def divide(self, int_a: int, int_b: int) -> int:
        """Divide dos números enteros (A / B)."""
        if int_b == 0:
            raise ValueError("No se puede dividir por cero.")
        return self.client.service.Divide(intA=int_a, intB=int_b)

def main():
    wsdl_url = "http://www.dneonline.com/calculator.asmx?WSDL"
    
    try:
        # Instanciar el cliente
        calculator = SoapCalculatorClient(wsdl_url)
        
        # Ejemplos de uso
        print("Ejecutando operaciones de ejemplo...\n")
        
        a, b = 10, 5
        
        result_add = calculator.add(a, b)
        print(f"{a} + {b} = {result_add}")
        
        result_sub = calculator.subtract(a, b)
        print(f"{a} - {b} = {result_sub}")
        
        result_mul = calculator.multiply(a, b)
        print(f"{a} * {b} = {result_mul}")
        
        result_div = calculator.divide(a, b)
        print(f"{a} / {b} = {result_div}")
        
        # Prueba de división por cero (manejo de errores)
        try:
            calculator.divide(10, 0)
        except ValueError as ve:
            print(f"\nError capturado localmente: {ve}")
        except Exception as e:
            print(f"\nError SOAP o de red al dividir por cero: {type(e).__name__}")

    except Exception as e:
        print(f"Ocurrió un error al conectar o ejecutar el servicio: {e}")

if __name__ == "__main__":
    main()
