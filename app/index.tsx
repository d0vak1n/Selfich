import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Platform,
	Pressable,
	StyleSheet,
	TextInput,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  // Estados para el temporizador
  const [tiempoMinutos, setTiempoMinutos] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState(0); // en segundos
  const [estaContando, setEstaContando] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función para convertir minutos a segundos
  const minutosASegundos = (minutos: number) => minutos * 60;

  // Función para formatear tiempo (segundos a MM:SS)
  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Efecto para manejar el contador
  useEffect(() => {
    if (estaContando && tiempoRestante > 0) {
      intervalRef.current = setInterval(() => {
        setTiempoRestante((prevTiempo) => {
          if (prevTiempo <= 1) {
            // Tiempo terminado
            setEstaContando(false);
            Alert.alert(
              "¡Tiempo terminado! ⏰",
              "Tu sesión de trabajo ha finalizado",
              [{ text: "OK", style: "default" }]
            );
            return 0;
          }
          return prevTiempo - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [estaContando, tiempoRestante]);

  // Función para iniciar el temporizador
  const iniciarTemporizador = () => {
    const minutos = parseInt(tiempoMinutos);

    if (isNaN(minutos) || minutos <= 0) {
      Alert.alert("Error", "Por favor ingresa un tiempo válido en minutos");
      return;
    }

    if (minutos > 480) {
      // Máximo 8 horas
      Alert.alert("Error", "El tiempo máximo es de 480 minutos (8 horas)");
      return;
    }

    const segundos = minutosASegundos(minutos);
    setTiempoRestante(segundos);
    setEstaContando(true);
  };

  // Función para pausar/reanudar
  const togglePausa = () => {
    setEstaContando(!estaContando);
  };

  // Función para detener y resetear
  const detenerTemporizador = () => {
    setEstaContando(false);
    setTiempoRestante(0);
    Alert.alert(
      "Temporizador detenido",
      "La sesión de trabajo ha sido cancelada"
    );
  };

  // Función para validar entrada numérica
  const handleTiempoChange = (texto: string) => {
    // Solo permitir números
    const numerosFiltrados = texto.replace(/[^0-9]/g, "");
    setTiempoMinutos(numerosFiltrados);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>Selfitch</ThemedText>
      </ThemedView>

      {/* Sección de configuración del tiempo */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Introduce el tiempo de tu jornada laboral</ThemedText>

        <TextInput
          style={styles.textInput}
          placeholder='Ingresa los minutos (ej: 25, 60, 90)'
          placeholderTextColor='#888'
          value={tiempoMinutos}
          onChangeText={handleTiempoChange}
          keyboardType='numeric'
          maxLength={3}
          editable={!estaContando}
        />

        {tiempoMinutos ? (
          <ThemedText style={styles.tiempoInfo}>
            Tiempo configurado: {tiempoMinutos} minutos
          </ThemedText>
        ) : null}
      </ThemedView>

      {/* Sección del temporizador */}
      <ThemedView style={styles.temporizadorContainer}>
        <ThemedText type='subtitle'>Temporizador</ThemedText>

        <ThemedView style={styles.displayTiempo}>
          <ThemedText style={styles.tiempoTexto}>
            {formatearTiempo(tiempoRestante)}
          </ThemedText>
          <ThemedText style={styles.estadoTexto}>
            {estaContando
              ? "🔴 Trabajando..."
              : tiempoRestante > 0
              ? "⏸️ Pausado"
              : "⏹️ Detenido"}
          </ThemedText>
        </ThemedView>

        {/* Botones de control */}
        <ThemedView style={styles.botonesContainer}>
          {tiempoRestante === 0 ? (
            <Pressable
              style={styles.botonIniciar}
              onPress={iniciarTemporizador}
            >
              <ThemedText style={styles.textoBoton}>📋 Fichar</ThemedText>
            </Pressable>
          ) : (
            <>
              <Pressable
                style={[
                  styles.boton,
                  estaContando ? styles.botonPausar : styles.botonReanudar,
                ]}
                onPress={togglePausa}
              >
                <ThemedText style={styles.textoBoton}>
                  {estaContando ? "⏸️ Pausar" : "▶️ Reanudar"}
                </ThemedText>
              </Pressable>

              <Pressable
                style={[styles.boton, styles.botonDetener]}
                onPress={detenerTemporizador}
              >
                <ThemedText style={styles.textoBoton}>⏹️ Detener</ThemedText>
              </Pressable>
            </>
          )}
        </ThemedView>
      </ThemedView>

      {/* Información adicional */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>📋 Instrucciones:</ThemedText>
        <ThemedText>
          • Ingresa el tiempo en minutos que vas a trabajar
        </ThemedText>
        <ThemedText>
          • Presiona "Fichar" para iniciar el temporizador
        </ThemedText>
        <ThemedText>• Puedes pausar y reanudar cuando necesites</ThemedText>
        <ThemedText>• Recibirás una alerta cuando termine el tiempo</ThemedText>
        <ThemedText>• Máximo permitido: 480 minutos (8 horas)</ThemedText>
      </ThemedView>

      {/* Sugerencias de tiempo */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>⏱️ Tiempos Sugeridas:</ThemedText>
        <ThemedView style={styles.sugerenciasContainer}>
          <Pressable
            style={styles.sugerencia}
            onPress={() => !estaContando && setTiempoMinutos("25")}
            disabled={estaContando}
          >
            <ThemedText style={styles.textoSugerencia}>25 min</ThemedText>
            <ThemedText style={styles.descripcionSugerencia}>
              Pomodoro
            </ThemedText>
          </Pressable>

          <Pressable
            style={styles.sugerencia}
            onPress={() => !estaContando && setTiempoMinutos("60")}
            disabled={estaContando}
          >
            <ThemedText style={styles.textoSugerencia}>60 min</ThemedText>
            <ThemedText style={styles.descripcionSugerencia}>1 hora</ThemedText>
          </Pressable>

          <Pressable
            style={styles.sugerencia}
            onPress={() => !estaContando && setTiempoMinutos("90")}
            disabled={estaContando}
          >
            <ThemedText style={styles.textoSugerencia}>90 min</ThemedText>
            <ThemedText style={styles.descripcionSugerencia}>
              Sesión larga
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  textInput: {
    borderWidth: 1,
	width: "20%",
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    fontWeight: "600",
  },
  tiempoInfo: {
    textAlign: "center",
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.8,
  },
  temporizadorContainer: {
    gap: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  displayTiempo: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  tiempoTexto: {
    fontSize: 48,
    fontWeight: "800",
    color: "#2c3e50",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
  },
  estadoTexto: {
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.7,
  },
  botonesContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  boton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  botonIniciar: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  botonPausar: {
    backgroundColor: "#FF9800",
  },
  botonReanudar: {
    backgroundColor: "#2196F3",
  },
  botonDetener: {
    backgroundColor: "#F44336",
  },
  textoBoton: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  sugerenciasContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  sugerencia: {
    flex: 1,
    backgroundColor: "#e8f4fd",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  textoSugerencia: {
    fontWeight: "700",
    fontSize: 16,
    color: "#007AFF",
  },
  descripcionSugerencia: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
});
