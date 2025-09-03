import { Image } from "expo-image";
import { useState } from "react";
import { Alert, Platform, StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  // Estado para manejar el texto del input
  const [texto, setTexto] = useState("");
  const [contador, setContador] = useState(0);

  // Función para manejar cambios en el input
  const handleTextChange = (nuevoTexto: string) => {
    setTexto(nuevoTexto);
    setContador(nuevoTexto.length);
  };

  // Función para mostrar el texto en una alerta
  const mostrarTexto = () => {
    if (texto.trim()) {
      Alert.alert("Tu texto", texto);
    } else {
      Alert.alert("Error", "Por favor escribe algo");
    }
  };

  // Función para limpiar el texto
  const limpiarTexto = () => {
    setTexto("");
    setContador(0);
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
        <ThemedText type='title'>Aprendiendo React Native!</ThemedText>
      </ThemedView>

      {/* Sección del TextInput */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Ejemplo de TextInput con Estado</ThemedText>

        <TextInput
          style={styles.textInput}
          placeholder='Escribe algo aquí...'
          placeholderTextColor='#888'
          value={texto}
          onChangeText={handleTextChange}
          multiline={true}
          numberOfLines={3}
        />

        <ThemedText>Caracteres: {contador}</ThemedText>

        {texto ? (
          <ThemedView style={styles.textoMostrado}>
            <ThemedText type='defaultSemiBold'>Tu texto:</ThemedText>
            <ThemedText>"{texto}"</ThemedText>
          </ThemedView>
        ) : null}

        <ThemedView style={styles.botonesContainer}>
          <ThemedText style={styles.boton} onPress={mostrarTexto}>
            Mostrar en Alerta
          </ThemedText>

          <ThemedText
            style={[styles.boton, styles.botonLimpiar]}
            onPress={limpiarTexto}
          >
            Limpiar
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Conceptos aprendidos:</ThemedText>
        <ThemedText>• useState para manejar estado</ThemedText>
        <ThemedText>• TextInput para entrada de texto</ThemedText>
        <ThemedText>• onChangeText para detectar cambios</ThemedText>
        <ThemedText>• Renderizado condicional</ThemedText>
        <ThemedText>• Funciones para manejar eventos</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type='subtitle'>Ejercicio Original:</ThemedText>
        <ThemedText>
          Edit <ThemedText type='defaultSemiBold'>app/index.tsx</ThemedText> to
          see changes. Press{" "}
          <ThemedText type='defaultSemiBold'>
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
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
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    textAlignVertical: "top",
    minHeight: 80,
  },
  textoMostrado: {
    backgroundColor: "#e8f4fd",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  botonesContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  boton: {
    backgroundColor: "#007AFF",
    color: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    textAlign: "center",
    fontWeight: "600",
    flex: 1,
  },
  botonLimpiar: {
    backgroundColor: "#FF3B30",
  },
});
