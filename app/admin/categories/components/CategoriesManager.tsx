'use client';

import { useState } from 'react';
import { Category, Division } from '@/lib/types/divisions_types';
import CategoryForm from './CategoryForm';
import CategoryList from './CategoryList';
import Button from '@/shared/components/ui/Button';

interface CategoriesManagerProps {
  initialCategories: Category[];
  division: Division;
}

export default function CategoriesManager({
  initialCategories,
  division,
}: CategoriesManagerProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setSelectedCategory(undefined);
    setIsAdding(true);
    setIsEditing(false);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsAdding(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setSelectedCategory(undefined);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleCreate = async (category: Category) => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create category');
      }

      const newCategory = await response.json();
      setCategories([...categories, newCategory]);
      setIsAdding(false);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleUpdate = async (category: Category) => {
    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update category');
      }

      const updatedCategory = await response.json();
      setCategories(
        categories.map((c) =>
          c.id === updatedCategory.id ? updatedCategory : c
        )
      );
      setIsEditing(false);
      setSelectedCategory(undefined);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete category');
      }

      setCategories(categories.filter((c) => c.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unknown error occurred');
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="">
          {isAdding
            ? 'Add New Category'
            : isEditing
            ? 'Edit Category'
            : `Categories`}
        </h3>

        <div>
          {isAdding || isEditing ? (
            <Button onClick={handleCancel} variant="outline" size="default">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleAdd} variant="primary" size="default">
              Add Category
            </Button>
          )}
        </div>
      </div>

      {(isAdding || isEditing) && (
        <CategoryForm
          category={selectedCategory}
          divisionId={division.id!}
          onSubmit={isAdding ? handleCreate : handleUpdate}
        />
      )}

      {!isAdding && !isEditing && (
        <CategoryList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
