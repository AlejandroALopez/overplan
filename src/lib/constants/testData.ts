/* eslint-disable no-multi-str */
import { Plan, PlanResult, Week } from "@/lib/types/planTypes";

export const testWeeks: Week = {
  "Week 1": ["Some task A", "Some task B", "Extra C", "Extra 2"],
  "Week 2": ["Some task C", "Some task D"],
  "Week 3": ["Some task E", "Some task F"],
  "Week 4": ["Some task G", "Some task H"],
};

export const plan1: Plan = {
  id: "028ch82hncm209382yd23",
  user_id: "asd0i2nd0n02h72gd723d",
  goal: "Learn Python",
  weeksTotal: 4,
  weeksCompleted: 0,
};

export const testPlan1: PlanResult = {
  goal: "Learn Python",
  numWeeks: 4,
  tasks: [
    {
      id: "andu292hn232jd02323d23d2",
      title: "Install Python and an IDE",
      description:
        "Download and set up Python along with an Integrated Development Environment (IDE) for coding.",
      week: 1,
      status: "Completed",
    },
    {
      id: "89cn2ni2mc23hc8723g9203op23d",
      title: "Learn basic syntax and data types",
      description:
        "Understand the fundamental syntax of Python and learn about different data types like strings, \
        integers, floats, and booleans.",
      week: 1,
      status: "Active",
    },
    {
      id: "cm2inb8347c3g48huijkof23",
      title: "Practice writing simple programs",
      description:
        "Start coding simple programs to get hands-on experience with Python syntax and data types.",
      week: 2,
      status: "Active",
    },
    {
      id: "2dn23923hj0m2p3od,223d",
      title: "Explore control flow (if statements, loops)",
      description:
        "Learn about conditional statements (if, elif, else) and loops (for, while) to control the \
          flow of your programs.",
      week: 3,
      status: "Backlog",
    },
    {
      id: "2dh923dh23j0dop2k20d2",
      title: "Study functions and modules",
      description:
        "Understand how to define and use functions in Python, and explore modules to extend the \
        functionality of your programs.",
      week: 4,
      status: "Backlog",
    },
  ],
};
