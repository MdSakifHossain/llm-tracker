import MessageBox from "./MessageBox";
import { formatNumber, getParams } from "../utils.js";

export default function RenderModels({ list }) {
  const models = list;

  if (models.length === 0) {
    return <MessageBox message="No Models Found" />;
  }

  return <GetTable array={models} />;
}

function GetTable({ array }) {
  const models = array;

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Model</th>
          <th scope="col" className="text-center">
            Params
          </th>
          <th scope="col" className="text-center">
            Context
          </th>
          <th scope="col" className="text-center">
            Web
          </th>
          <th scope="col" className="text-center">
            Agent
          </th>
          <th scope="col" className="text-center">
            Type
          </th>
          <th scope="col" className="text-right">
            URL
          </th>
        </tr>
      </thead>
      <tbody>
        {models.map((model) => (
          <tr key={model._id}>
            <th scope="row">{model.name}</th>
            <td className="text-center">{getParams(model)}</td>
            <td className="text-center">{formatNumber(model.contextWindow)}</td>
            <td className="text-center">{model.ranOnWeb ? "✅" : "❌"}</td>
            <td className="text-center">
              {model.ranThroughAgent ? "✅" : "❌"}
            </td>
            <td className="text-center">{model.isThinking ? "🧠" : "⚡"}</td>
            <td className="text-right">
              <a href={model.url} target="_blank" className="secondary">
                Link ↗
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
