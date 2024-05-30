// src/contexts/AppContext.tsx
import { createContext, useState, ReactNode, useContext } from 'react';
import { ToDo } from '@/types/to-do';
import { Category } from '@/types/category';

interface AppContextProps {
    toDoSelected: ToDo | undefined;
    setToDoSelected: (toDo: ToDo | undefined) => void;
    categorySelected: Category | undefined;
    setCategorySelected: (category: Category | undefined) => void;
    isToDoDialogOpen: boolean;
    setToDoDialogOpen: (isOpen: boolean) => void;
    isCategoryDialogOpen: boolean;
    setCategoryDialogOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [toDoSelected, setToDoSelected] = useState<ToDo | undefined>(undefined);
    const [categorySelected, setCategorySelected] = useState<Category | undefined>(undefined);
    const [isToDoDialogOpen, setToDoDialogOpen] = useState<boolean>(false);
    const [isCategoryDialogOpen, setCategoryDialogOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{
            toDoSelected, setToDoSelected,
            categorySelected, setCategorySelected,
            isToDoDialogOpen, setToDoDialogOpen,
            isCategoryDialogOpen, setCategoryDialogOpen
        }}>
            {children}
        </AppContext.Provider>
    );
};
