import React, { useState } from "react";

return (
  <main className="TodoApp">
    <div className="row">
      <div className="col-md-6">
        <h3 className="mb-3">Todos</h3>
        {todos.length > 0
            ? <EditableTodoList
                todos={todos}
                update={update}
                remove={remove} />
            : <span className="text-muted">You have no todos.</span>}
      </div>

      <div className="col-md-6">
        {todos.length > 0 && (
            <section className="mb-4">
              <h3 className="mb-3">Top Todo</h3>
              <TopTodo todos={todos} />
            </section>
        )}

        <section>
          <h3 className="mb-3">Add Nü</h3>
          <TodoForm handleSave={create} />
        </section>
      </div>

    </div>
  </main>
);