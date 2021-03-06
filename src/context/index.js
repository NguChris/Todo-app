import React, {createContext, useState} from 'react'
import { useTodos, useProjects, useFilterTodos, useProjectsWithStats } from '../hooks'

const TodoContext = createContext()

function TodoContextProvider({children}) {

    // HOOKS
    const defaultProject = 'today'
    const [selectedProject, setSelectedProject] = useState(defaultProject)
    const [selectedTodo, setSelectedTodo] = useState(undefined)
    const [darkTheme, setDarkTheme] = useState(false)
    const [click, setClick] = useState(false)

    // CUSTOM HOOKS
    const todos = useTodos()
    const projects = useProjects(todos)
    const projectsWithStats = useProjectsWithStats(projects, todos)
    const filteredTodos = useFilterTodos(todos, selectedProject)

    return (
        <TodoContext.Provider 
            value={{
                        defaultProject,
                        selectedProject,
                        setSelectedProject,
                        todos : filteredTodos,
                        projects : projectsWithStats,
                        selectedTodo,
                        setSelectedTodo,
                        darkTheme,
                        setDarkTheme,
                        click,
                        setClick
                   }
            }>
            {children}
        </TodoContext.Provider>
    )
}

export {TodoContextProvider, TodoContext}