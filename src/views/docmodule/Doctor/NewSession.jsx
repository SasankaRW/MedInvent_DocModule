import { Divider } from "@mui/material";
import Title from "../../../Components/MyComponents/Title";
import styles from "./NewSession.module.css";

function NewSession() {
  return (
    <div className={styles.main}>
      <Title>New Session</Title>

      <div
        className={`d-flex bg-white shadow p-2 justify-content-between ${styles.content}`}
      >
        <div className="p-4">
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>1</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>2</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>3</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>4</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>5</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>6</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>7</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>8</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>9</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>10</div>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>11</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>12</div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-5">
              <div class={styles.gridItem}>13</div>
            </div>
            <div class="col-sm-7">
              <div class={styles.gridItem}>14</div>
            </div>
          </div>
        </div>
        <div className={`${styles.image} d-none d-lg-flex align-items-end`}>
          <img src="../../images/newsession.png" alt="img" height={300} />
        </div>
      </div>
    </div>
  );
}

export default NewSession;
