/*
 * 同步读写磁盘文件相关类型。
 */
declare namespace SyncFile {
  /*
   * 写入模式：在文件末尾追加，或覆盖原有内容。
   */
  type FileWriteMode = 'append' | 'overwrite';
}
