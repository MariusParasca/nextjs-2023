export default function Layout(props: { children: React.ReactNode; albums: React.ReactNode; todos: React.ReactNode }) {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {props.albums}
        {props.todos}
      </div>
      {props.children}
    </>
  );
}
