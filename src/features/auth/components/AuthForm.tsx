import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

type Props = {
  fields: { label: string; value: string; onChange: (v: string) => void; secure?: boolean }[];
  onSubmit: () => void;
  submitLabel?: string;
  error?: string | null;
};

export default function AuthForm({ fields, onSubmit, submitLabel = 'Submit', error }: Props) {
  return (
    <View style={{ padding: 16 }}>
      {fields.map((f, i) => (
        <View key={i} style={{ marginBottom: 12 }}>
          <Text>{f.label}</Text>
          <TextInput
            value={f.value}
            onChangeText={f.onChange}
            autoCapitalize="none"
            secureTextEntry={f.secure}
            style={{ borderBottomWidth: 1, paddingVertical: 4 }}
          />
        </View>
      ))}
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title={submitLabel} onPress={onSubmit} />
    </View>
  );
}
