interface DocumentHelper {
    useCaseDiagrams: string[];
    classDiagrams: string[];
    stateDiagrams: string[];
    mindMaps: string[];
    databaseDiagrams: string[];
  
    addUseCaseDiagrams(useCaseDiagrams: string[]): DocumentHelper;
    addClassDiagrams(classDiagrams: string[]): DocumentHelper;
    addStateDiagrams(stateDiagrams: string[]): DocumentHelper;
    addMindMaps(mindMaps: string[]): DocumentHelper;
    addDatabaseDiagrams(databaseDiagrams: string[]): DocumentHelper;
  
    renderUseCaseDiagrams(): void;
    renderClassDiagrams(): void;
    renderStateDiagrams(): void;
    renderMindMaps(): void;
    renderDatabaseDiagrams(): void;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
  const DocumentHelper: DocumentHelper = {
    useCaseDiagrams: [],
    classDiagrams: [],
    stateDiagrams: [],
    mindMaps: [],
    databaseDiagrams: [],

    addUseCaseDiagrams: function (useCaseDiagrams: string[]): DocumentHelper {
      if (useCaseDiagrams) {
        this.useCaseDiagrams = useCaseDiagrams
        this.renderUseCaseDiagrams()
      }
      return this
    },

    addClassDiagrams: function (classDiagrams: string[]): DocumentHelper {
      if (classDiagrams) {
        this.classDiagrams = classDiagrams
        this.renderClassDiagrams()
      }
      return this
    },

    addStateDiagrams: function (stateDiagrams: string[]): DocumentHelper {
      if (stateDiagrams) {
        this.stateDiagrams = stateDiagrams
        this.renderStateDiagrams()
      }
      return this
    },

    addMindMaps: function (mindMaps: string[]): DocumentHelper {
      if (mindMaps) {
        this.mindMaps = mindMaps
        this.renderMindMaps()
      }
      return this
    },

    addDatabaseDiagrams: function (databaseDiagrams: string[]): DocumentHelper {
      if (databaseDiagrams) {
        this.databaseDiagrams = databaseDiagrams
        this.renderDatabaseDiagrams()
      }
      return this
    },

    renderUseCaseDiagrams: function () {
      this.renderDiagrams('use-case-diagrams-container', 'Use Case Diagrams', this.useCaseDiagrams)
    },

    renderClassDiagrams: function () {
      this.renderDiagrams('class-diagrams-container', 'Class Diagrams', this.classDiagrams)
    },

    renderStateDiagrams: function () {
      this.renderDiagrams('state-diagrams-container', 'State Diagrams', this.stateDiagrams)
    },

    renderMindMaps: function () {
      this.renderDiagrams('mind-maps-container', 'Mind Maps', this.mindMaps)
    },

    renderDatabaseDiagrams: function () {
      this.renderDiagrams('database-diagrams-container', 'Database Diagrams', this.databaseDiagrams)
    },
  }
  
    // Example usage
    DocumentHelper.addUseCaseDiagrams([
      "Project Management",
      "Task Assignment",
      "Text Chat",
      "Audio Chat",
    ]);
  
    DocumentHelper.addClassDiagrams([
      "Class Diagram 1",
      "Class Diagram 2",
      "Class Diagram 3",
    ]);
  
    DocumentHelper.addStateDiagrams([
      "State Diagram 1",
      "State Diagram 2",
      "State Diagram 3",
    ]);
  
    DocumentHelper.addMindMaps([
      "Mind Map 1",
      "Mind Map 2",
      "Mind Map 3",
    ]);
  
    DocumentHelper.addDatabaseDiagrams([
      "Database Diagram 1",
      "Database Diagram 2",
      "Database Diagram 3",
    ]);
  });
  