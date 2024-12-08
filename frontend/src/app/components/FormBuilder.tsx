"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormField {
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[]; // For dropdowns and radio buttons
    defaultValue?: string;
}

const FormBuilder: React.FC = () => {
    const [fields, setFields] = useState<FormField[]>([]);
    const [formTitle, setFormTitle] = useState("Untitled Form");
    const [formDescription, setFormDescription] = useState("");

    const fieldTypes = [
        { label: "Text Input", type: "text" },
        { label: "Number Input", type: "number" },
        { label: "Date Picker", type: "date" },
        { label: "Checkbox", type: "checkbox" },
        { label: "Dropdown", type: "dropdown" },
        { label: "Radio Buttons", type: "radio" },
    ];

    const addField = (type: string) => {
        const newField: FormField = {
            id: `${Date.now()}`,
            type,
            label: "New Field",
            required: false,
        };
        if (type === "dropdown" || type === "radio") {
            newField.options = ["Option 1", "Option 2"];
        }
        setFields([...fields, newField]);
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) return;
        const reorderedFields = [...fields];
        const [movedField] = reorderedFields.splice(result.source.index, 1);
        reorderedFields.splice(result.destination.index, 0, movedField);
        setFields(reorderedFields);
    };

    const updateField = (id: string, updatedField: Partial<FormField>) => {
        setFields(fields.map((field) => (field.id === id ? { ...field, ...updatedField } : field)));
    };

    const removeField = (id: string) => {
        setFields(fields.filter((field) => field.id !== id));
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg">
                <input
                    type="text"
                    className="text-2xl font-bold w-full border-b mb-4 focus:outline-none"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Form Title"
                />
                <textarea
                    className="w-full border rounded-lg p-2 mb-4 focus:outline-none"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Form Description"
                ></textarea>
                <div className="flex gap-2 mb-4">
                    {fieldTypes.map((field) => (
                        <button
                            key={field.type}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => addField(field.type)}
                        >
                            {field.label}
                        </button>
                    ))}
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="fields">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {fields.map((field, index) => (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="p-4 mb-2 bg-gray-100 border rounded-lg"
                                            >
                                                <input
                                                    type="text"
                                                    className="w-full border-b mb-2 focus:outline-none"
                                                    value={field.label}
                                                    onChange={(e) =>
                                                        updateField(field.id, { label: e.target.value })
                                                    }
                                                    placeholder="Field Label"
                                                />
                                                {field.type === "text" && (
                                                    <input
                                                        type="text"
                                                        className="w-full border p-2 rounded-lg"
                                                        placeholder={field.placeholder || "Placeholder"}
                                                        onChange={(e) =>
                                                            updateField(field.id, { placeholder: e.target.value })
                                                        }
                                                    />
                                                )}
                                                {field.type === "date" && <DatePicker className="w-full border p-2 rounded-lg" />}
                                                {field.type === "dropdown" && (
                                                    <div>
                                                        {field.options?.map((option, idx) => (
                                                            <input
                                                                key={idx}
                                                                className="w-full border p-2 rounded-lg mb-2"
                                                                value={option}
                                                                onChange={(e) => {
                                                                    const updatedOptions = [...(field.options || [])];
                                                                    updatedOptions[idx] = e.target.value;
                                                                    updateField(field.id, { options: updatedOptions });
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                                <button
                                                    className="text-red-500 mt-2"
                                                    onClick={() => removeField(field.id)}
                                                >
                                                    Remove Field
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default FormBuilder;
