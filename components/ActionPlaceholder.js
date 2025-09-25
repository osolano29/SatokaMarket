import React from 'react';

export default function ActionPlaceholder({ contract, action }) {
  if (!action) return null;

  return (
    <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Acción seleccionada</h3>
      <p className="mb-1"><strong>Contrato:</strong> {contract}</p>
      <p><strong>Función:</strong> {action}</p>
      <p className="text-sm text-gray-600 mt-2">(Aquí se mostrará el formulario o vista correspondiente a la acción seleccionada)</p>
    </div>
  );
}
