import { Component, ViewChild } from '@angular/core';
import { ZyfraSortEvent } from 'src/zyfra-table/elements/sort/zyfra-sort.directive';
import { NestingNode, ZyfraTableComponent, ZyfraTableNesting } from 'src/zyfra-table/zyfra-table.component';

interface NodeData {
  name: string;
  size: string;
  type: string;
}

interface Node {
  data: NodeData;
  children?: Node[];
}

const nestingData: Node[] = [
  {
    "data": {
      "name": "Desktop",
      "size": "150kb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "note-meeting.txt",
          "size": "50kb",
          "type": "Text"
        }
      },
      {
        "data": {
          "name": "note-todo.txt",
          "size": "100kb",
          "type": "Text"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Applications",
      "size": "200mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "Angular",
          "size": "25mb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "angular.app",
              "size": "10mb",
              "type": "Application"
            }
          },
          {
            "data": {
              "name": "cli.app",
              "size": "10mb",
              "type": "Application"
            }
          },
          {
            "data": {
              "name": "mobile.app",
              "size": "5mb",
              "type": "Application"
            }
          }
        ]
      },
      {
        "data": {
          "name": "editor.app",
          "size": "25mb",
          "type": "Application"
        }
      },
      {
        "data": {
          "name": "settings.app",
          "size": "50mb",
          "type": "Application"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Cloud",
      "size": "20mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "backup-1.zip",
          "size": "10mb",
          "type": "Zip"
        }
      },
      {
        "data": {
          "name": "backup-2.zip",
          "size": "10mb",
          "type": "Zip"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Documents",
      "size": "75kb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "Work",
          "size": "55kb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "Expenses.doc",
              "size": "30kb",
              "type": "Document"
            }
          },
          {
            "data": {
              "name": "Resume.doc",
              "size": "25kb",
              "type": "Resume"
            }
          }
        ]
      },
      {
        "data": {
          "name": "Home",
          "size": "20kb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "Invoices",
              "size": "20kb",
              "type": "Text"
            }
          }
        ]
      }
    ]
  },
  {
    "data": {
      "name": "Downloads",
      "size": "25mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "Spanish",
          "size": "10mb",
          "type": "Folder"
        },
        "children": [
          {
            "data": {
              "name": "tutorial-a1.txt",
              "size": "5mb",
              "type": "Text"
            }
          },
          {
            "data": {
              "name": "tutorial-a2.txt",
              "size": "5mb",
              "type": "Text"
            }
          }
        ]
      },
      {
        "data": {
          "name": "Travel",
          "size": "15mb",
          "type": "Text"
        },
        "children": [
          {
            "data": {
              "name": "Hotel.pdf",
              "size": "10mb",
              "type": "PDF"
            }
          },
          {
            "data": {
              "name": "Flight.pdf",
              "size": "5mb",
              "type": "PDF"
            }
          }
        ]
      }
    ]
  },
  {
    "data": {
      "name": "Main",
      "size": "50mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "bin",
          "size": "50kb",
          "type": "Link"
        }
      },
      {
        "data": {
          "name": "etc",
          "size": "100kb",
          "type": "Link"
        }
      },
      {
        "data": {
          "name": "var",
          "size": "100kb",
          "type": "Link"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Other",
      "size": "5mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "todo.txt",
          "size": "3mb",
          "type": "Text"
        }
      },
      {
        "data": {
          "name": "logo.png",
          "size": "2mb",
          "type": "Picture"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Pictures",
      "size": "150kb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "barcelona.jpg",
          "size": "90kb",
          "type": "Picture"
        }
      },
      {
        "data": {
          "name": "primeng.png",
          "size": "30kb",
          "type": "Picture"
        }
      },
      {
        "data": {
          "name": "prime.jpg",
          "size": "30kb",
          "type": "Picture"
        }
      }
    ]
  },
  {
    "data": {
      "name": "Videos",
      "size": "1500mb",
      "type": "Folder"
    },
    "children": [
      {
        "data": {
          "name": "primefaces.mkv",
          "size": "1000mb",
          "type": "Video"
        }
      },
      {
        "data": {
          "name": "intro.avi",
          "size": "500mb",
          "type": "Video"
        }
      }
    ]
  }
];

interface FlatNode {
  expandable: boolean;
  name: string;
  type: string;
  children: Node[];
}

@Component({
  selector: 'app-tree-page',
  templateUrl: './tree-page.component.html',
  styleUrls: ['./tree-page.component.css']
})
export class TreePageComponent {
  columns: string[] = ['name', 'type', 'size'];
  data = [...nestingData];

  sortRules = {
    size: (a: Node, b: Node, isAsc: boolean) => compare(parseInt(a.data.size), parseInt(b.data.size), isAsc),
    type: (a: Node, b: Node, isAsc: boolean) => compare(a.data.type, b.data.type, isAsc),
    name: (a: Node, b: Node, isAsc: boolean) => compare(a.data.name, b.data.name, isAsc),
  };

  @ViewChild(ZyfraTableComponent) table: ZyfraTableComponent<Node>;

  nesting: ZyfraTableNesting<Node, FlatNode> = {
    transformer: (node) => ({
      expandable: !!node.children && node.children.length > 0,
      type: node.data.type,
      size: node.data.size,
      children: node.children || [],
      name: node.data.name,
    }),
    getChildren: node => node.children,
    expanded: false
  }

  sortChange(sortEvent: ZyfraSortEvent) {
    const d = [...nestingData];

    console.log(sortEvent);
    const isAsc = sortEvent.direction === 'asc';

    if (!sortEvent.column || sortEvent.direction === '') {
      this.table.setData(d);
      return;
    }

    function sort(data: any[]) {
      let copy = [...data];

      copy = copy.sort((a, b) => {
        switch (sortEvent.column) {
          case 'name': return compare(a.data.name, b.data.name, isAsc);
          case 'type': return compare(a.data.type, b.data.type, isAsc);
          case 'size': return compare(parseInt(a.data.size), parseInt(b.data.size), isAsc);
          default: return 0;
        }
      });

      for (let child of copy) {
        if (child.children) {
          child.children = sort(child.children);
        }
      }

      return copy;
    }

    this.table.setData(sort(d));
  }

  toggleSelection(node: NestingNode<Node>) {
    this.table.toggleSelection(node);
  }

  stopProp(event: Event) {
    event.stopPropagation();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  if (a === undefined && b === undefined) return 0;
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}